require('dotenv').config();

const Alchemy = require('../services/alchemy.services');
const express = require('express');
const router = express();

router.get('/api/eth/:chain/:network/wallet/:wallet/tokens', async function getWalletTokens(req,res) {
  console.log('API Endpoint: getWalletTokens');

  const { chain, network, wallet } = req.params;

  let settings = await Alchemy.setNetworkEndpoint(chain, network, 'getWalletTokens');

  let nativeTokens = await Alchemy.getWalletNativeBalance(settings, wallet);

  let walletTokens = await Alchemy.getWalletERC20Balance(settings, wallet, nativeTokens);

  let nonZeroTokens = await Alchemy.filterWalletTokens(walletTokens);

  let tokens = await Alchemy.formatWalletTokens(nonZeroTokens);

  return res.json({ 'tokens': tokens });
});

module.exports = router;
