require('dotenv').config();

const WalletServices = require('../services/wallet.services')
const express = require('express');
const router = express();

router.post('/api/group-wallet', async function postGroupWallet(req, res) {
  console.log('API Endpoint: postGroupWallet');

  const { walletId, groupId } = req.body;

  const groupWallet = await WalletServices.findOrCreateGroupWallet(walletId, groupId);

  return res.json({ 'groupWallet': groupWallet });
});

module.exports = router;
