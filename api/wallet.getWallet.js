require('dotenv').config();

const express = require('express');
const router = express();

const Wallet = require('../models/wallets');
const WalletGroups = require('../models/groupWallets');

router.get('/api/wallet/:address', async function getWalletTokens(req,res) {
  console.log('API Endpoint: getWallet');

  const { address } = req.params;

  if (!address) {
    return res.send('Error: Wallet address is undefined.')
  }

  try {
    /**
     * STEP 1: RETRIEVE INFO ABOUT A SPECIFIC WALLET
     */
    const walletRaw = await Wallet.where('address', address).fetch();

    let wallet = JSON.parse(JSON.stringify(walletRaw));

    /** 
     * STEP 2: RETRIEVE GROUPS RECORDS
     */
    let walletGroupsRaw = await WalletGroups.where('wallet_id', wallet.id).fetchAll({withRelated: ['groups']});

    let walletGroups = await JSON.parse(JSON.stringify(walletGroupsRaw)).map((item) => item.groups);

    return res.json({
      'info': wallet,
      'groups': walletGroups
    });
  } catch (err) {
    if (err.message === 'EmptyResponse') {
      return res.send('No Wallet with this address.')
    } else {
      console.error(err);

      return res.sendStatus(500);
    }
  }
});

module.exports = router;
