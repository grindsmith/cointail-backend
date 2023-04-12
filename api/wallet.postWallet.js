require('dotenv').config();

const express = require('express');
const router = express();

router.post('/api/wallet', async function postWallet(req, res) {
  console.log('API Endpoint: postWallet');

  const { address } = req.body;

  const wallet = await WalletServices.findOrCreateWallet(address);
  
  return res.json({ 'wallet': wallet });
});

module.exports = router;
