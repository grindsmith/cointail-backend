const express = require('express');
const router = express();

const EthController = require('./controllers/eth.controller');
router.get('/api/eth/:chain/:network/wallet/:wallet/tokens', EthController.GET_WALLET_TOKENS);
router.get('/api/eth/:chain/:network/wallet/:wallet/transactions', EthController.GET_WALLET_TRANSACTIONS);

/**
 * Status: Not Used (
 * Retrieves DexScreener Token Pairings)
 * router.get('/api/eth/:chain/token/:contract/pairs', EthController.GET_TOKEN_PAIRS);
 */

/**
 * Status: Not Used 
 * (Retrieves Venture Capital Token Category Holdings)
 * router.get('/api/eth/:chain/token/categories', EthController.GET_TOKEN_CATEGORIES);
 */

module.exports = router;
