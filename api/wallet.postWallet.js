require('dotenv').config();

const express = require('express');
const router = express();
const WalletServices = require('../services/wallet.services');

router.post('/api/wallet', async function postWallet(req, res) {
  console.log('API Endpoint: postWallet');

  const { address } = req.body;

  // Create Wallet Record
  const walletRaw = await WalletServices.findOrCreateWallet(address);

  const wallet = JSON.parse(JSON.stringify(walletRaw));

  // Add Newly Create Wallet to All Users Group
  const groupWallet = await WalletServices.findOrCreateGroupWallet(wallet.id, process.env.GROUP_ID_ALL_USERS);
  
  return res.json({ 'wallet': wallet });
});

module.exports = router;
