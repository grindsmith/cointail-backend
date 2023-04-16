require('dotenv').config();

const Alchemy = require('../services/alchemy.services');
const express = require('express');
const router = express();

router.get('/api/eth/:chain/:network/wallet/:wallet/transactions', async function getWalletTransactions(req,res) {
  console.log('API Endpoint: getWalletTransactions');

  const { chain, network, wallet } = req.params;

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
});

module.exports = router;