require('dotenv').config();

// Services
const FrontendServices = require('../services/frontend.services');
const WalletServices = require('../helpers/wallets.helper');

// Database Models
const Groups = require('../models/groups');
const GroupWallets = require('../models/groupWallets');

module.exports = {
  getAllGroups: async function (req,res) {
    console.log('API Endpoints: getAllGroups');
    
    try {
      /**
       * STEP 1: RETRIEVE INFO ABOUT A SPECIFIC WALLET
       */
      const allGroups = await Groups.fetchAll();
  
      return res.json({
        'allGroups': allGroups
      });
    } catch (err) {
      if (err.message === 'EmptyResponse') {
        return res.send('No Groups.')
      } else {
        console.error(err);
  
        return res.sendStatus(500);
      }
    }
  },
  getGroup: async function (req,res) {
    console.log('API Endpoints: getWalletsByGroup');
    
    const { groupId } = req.params;
  
    try {
      /**
       * STEP 1: RETRIEVE INFO ABOUT A SPECIFIC WALLET
       */
      const groupRaw = await Groups.where('id', groupId).fetch();
  
      let group = JSON.parse(JSON.stringify(groupRaw));
  
      /** 
       * STEP 2: RETRIEVE GROUPS RECORDS
       */
      let groupWalletsRaw = await GroupWallets.where('group_id', groupId).fetchAll({withRelated: ['wallets']});
  
      let groupWallets = await JSON.parse(JSON.stringify(groupWalletsRaw)).map((item) => item.wallets);
  
      let groupWalletsFinal = await FrontendServices.formatGroupWalletsForSplitView(groupWallets)
  
      return res.json({
        'info': group,
        'wallets': groupWalletsFinal
      });
    } catch (err) {
      if (err.message === 'EmptyResponse') {
        return res.send('No Group with this Id.')
      } else {
        console.error(err);
  
        return res.sendStatus(500);
      }
    }
  },
  postGroup: async function (req, res) {
    console.log('API Endpoint: postGroup');
  
    const { name, description, address } = req.body;
  
    const walletRaw = await WalletServices.findOrCreateWallet(address);
  
    const wallet = JSON.parse(JSON.stringify(walletRaw));
  
    try {
      const newGroupRaw = await new Groups({ 'name': name, 'description': description }).save();
  
      const newGroup = JSON.parse(JSON.stringify(newGroupRaw));
      
      await new GroupWallets({ 'group_id': newGroup.id, 'wallet_id': wallet.id, 'group_owner': true }).save();
  
      let allGroups = await Groups.fetchAll();
  
      return res.json({ 'groups': allGroups })
    } catch (err) {
      console.error('Error: Group Creation Issue.', err.message);
  
      return err;
    }
  },
  postGroupWallet: async function (req, res) {
    console.log('API Endpoint: postGroupWallet');
  
    const { walletId, groupId } = req.body;
  
    const groupWallet = await WalletServices.findOrCreateGroupWallet(walletId, groupId);
  
    return res.json({ 'groupWallet': groupWallet });
  }
}