require('dotenv').config();

const Alchemy = require('../services/alchemy.services');
const express = require('express');
const router = express();

router.get('/api/eth/:chain/:network/wallet/:wallet/tokens', async function getWalletTokens(req,res) {
  console.log('API Endpoint: getWalletTokens');

  const { chain, network, wallet } = req.params;

  let settings = await Alchemy.setNetworkEndpoint(chain, network, 'getWalletTokens');

  let nativeTokens = await Alchemy.getAccountNativeBalance(settings, wallet);

  let accountTokens = await Alchemy.getAccountERC20Balance(settings, wallet, nativeTokens);

  let nonZeroTokens = await Alchemy.filterAccountTokens(accountTokens);

  let tokens = await Alchemy.formatAccountTokens(nonZeroTokens);

  return res.json(tokens);
});

module.exports = router;
