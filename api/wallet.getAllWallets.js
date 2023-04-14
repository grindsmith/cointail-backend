require('dotenv').config();

const express = require('express');
const router = express();

const Wallets = require('../models/wallets');
const FrontendServices = require('../services/frontend.services');

router.get('/api/wallet', async function getAllGroups(req,res) {
  console.log('API Endpoints: getAllWallets');
  
  try {
    /**
     * STEP 1: RETRIEVE INFO ABOUT A SPECIFIC WALLET
     */
    const allWalletsRaw = await Wallets.fetchAll();

    const allWallets = JSON.parse(JSON.stringify(allWalletsRaw));

    const allWalletsFinal = await FrontendServices.formatWalletsForCombobox(allWallets);

    return res.json({
      'allWallets': allWalletsFinal
    });
  } catch (err) {
    if (err.message === 'EmptyResponse') {
      return res.send('No Groups.')
    } else {
      console.error(err);

      return res.sendStatus(500);
    }
  }
});

module.exports = router;
