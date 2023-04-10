require('dotenv').config();

const Alchemy = require('../services/alchemy.services');
const express = require('express');
const router = express();

router.get('/api/eth/:chain/:network/wallet/:wallet/tokens', async function getWalletTransactions(req,res) {
  console.log('API Endpoint: getWalletTransactions');

  const { chain, network, wallet } = req.params;

  let settings = await Alchemy.setNetworkEndpoint(chain, network, 'getWalletTransactions');
  
  let unformattedTxs = await Alchemy.getAccountTransactions(settings, wallet, 50);
  
  let transactions = await Alchemy.formatAccountTransactions(settings, wallet, unformattedTxs, chain);

  return res.json(transactions);
});

module.exports = router;