require('dotenv').config();

// Services
const Alchemy = require('../services/alchemy.services');
const WalletServices = require('../helpers/wallets.helper');
const FrontendServices = require('../services/frontend.services');

// Database Models
const Wallets = require('../models/wallets');
const WalletGroups = require('../models/groupWallets');
const WalletTransactions = require('../models/walletTransactions');

module.exports = {
  /**
   * STEP 1: DONE
   * STEP 2: DONE
   * STEP 3: DONE
   * STEP 4: DONE
   * STEP 5: INCOMPLETE
   */
  getWallets: async function (req,res) {
    console.log('API Endpoint: getWallet');
  
    const { address } = req.query;
  
    try {
      if (address) {
        /** STEP 1: RETRIEVE INFO ABOUT A SPECIFIC WALLET */
        const walletRaw = await Wallets.where('address', address.toLowerCase()).fetch();

        let wallet = await JSON.parse(JSON.stringify(walletRaw))
      
        /** STEP 2: RETRIEVE GROUPS RECORDS */
        let walletGroupsRaw = await WalletGroups.where('wallet_id', wallet.id).fetchAll({withRelated: ['groups']});

        let walletGroups = await JSON.parse(JSON.stringify(walletGroupsRaw)).map((item) => item.groups);

        /** STEP 3: RETRIEVE FOLLOWING WALLETS */
        let following = await WalletServices.findWalletFollowers('follower_id', wallet.id);

        /** STEP 4: RETRIEVE FOLLOWER WALLETS */
        let followers = await WalletServices.findWalletFollowers('wallet_id', wallet.id);

        /**  STEP 5: RETRIEVE TRANSACTION RECORDS FOR FOLLOWING WALLETS */
        // let walletTransactions = await WalletTransactions.where('wallet_id','in', followingIds).fetchAll();

        return res.json({
          'info': JSON.parse(JSON.stringify(walletRaw)),
          'groups': walletGroups || [],
          'followers': followers,
          'following': following
        });
      } 
      else 
      {
        const allWalletsRaw = await Wallets.fetchAll();
      
        const allWallets = JSON.parse(JSON.stringify(allWalletsRaw));
    
        const allWalletsFinal = await FrontendServices.formatWalletsForCombobox(allWallets);
    
        return res.json({ 'wallets': allWalletsFinal });
      }
    } catch (err) {
      console.log(err);

      return res.sendStatus(500);
    }
  },
  postWallet: async function (req, res) {
    console.log('API Endpoint: postWallet');
  
    const { address } = req.body;
  
    // Create Wallet Record
    const walletRaw = await WalletServices.findOrCreateWallet(address);
  
    const wallet = JSON.parse(JSON.stringify(walletRaw));
  
    // Add Newly Create Wallet to All Users Group
    const groupWallet = await WalletServices.findOrCreateGroupWallet(wallet.id, process.env.GROUP_ID_ALL_USERS);
    
    return res.json({ 'wallet': wallet });
  },
  putWallet: async function (req,res) {
    console.log('API Endpoint: putWallet');
  
    const { wallet, name } = req.body;
  
    try {
        const updated = await Wallets.where('address', wallet).fetch();
        
        const saved = await updated.save({ 'name': name },{ method: 'update' });
  
        return res.json({ saved });
    } catch (error) {
        console.log('Error: ', error.message);
        
        return res.json({ error });
    }
  },
  getWalletTokens: async function (req, res) {
    console.log('API Endpoint: getWalletTokens');

    const { chain, network, wallet } = req.query;
  
    let settings = await Alchemy.setNetworkEndpoint(chain, network, 'getWalletTokens');
  
    let nativeTokens = await Alchemy.getWalletNativeBalance(settings, wallet);
  
    let walletTokens = await Alchemy.getWalletERC20Balance(settings, wallet, nativeTokens);
  
    let nonZeroTokens = await Alchemy.filterWalletTokens(walletTokens);
  
    let tokens = await Alchemy.formatWalletTokens(nonZeroTokens);
  
    let totalUSD = 0;
  
    tokens.forEach((token) => totalUSD = totalUSD + token.holdings);
  
    return res.json({ 
      'chainUSD': (totalUSD).toFixed(2),
      'tokens': tokens 
    });
  },
  getWalletTransactions: async function (req, res) {
    console.log('API Endpoint: getWalletTransactions');

    const { chain, network, wallet } = req.query;

    let settings = await Alchemy.setNetworkEndpoint(chain, network, 'getWalletTransactions');
    
    let unformattedTxs = await Alchemy.getWalletTransactions(settings, wallet, 50);

    /** List of Tokens that this wallet has transacted with */
    let transactedTokens = 
      await unformattedTxs
      .map((tx) => tx.asset)
      .filter((value, index, array) => array.indexOf(value) === index)
      .map((tx, i) => { return { 'id': i, 'label': tx, 'value': tx}})

    let transactions = await Alchemy.formatWalletTransactions(settings, wallet, unformattedTxs, chain);

    return res.json({ 
      'transactedTokens': transactedTokens,
      'transactions': transactions
    });
  },
}