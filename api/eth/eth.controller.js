require('dotenv').config();

const { Network } = require('alchemy-sdk');
const Alchemy = require('../services/alchemy.services');

module.exports = {
  GET_WALLET_TOKENS: async (req,res) => {
    const { chain, network, wallet } = req.params;

    /** SET NETWORK RPC ENDPOINT */
    const settings = {};
    if (chain === 'ethereum' && network === 'mainnet')
      settings = { apiKey: process.env.ALCHEMY_API_KEY, network: Network.ETH_MAINNET };
    else if (chain === 'arbitrum' && network === 'mainnet')
      settings = { apiKey: process.env.ALCHEMY_API_KEY, network: Network.ARB_MAINNET };

    /** RETRIEVE WALLET HOLDINGS ON CHAIN&NETWORK */
    let nativeTokens = await Alchemy.getAccountNativeBalance(settings, wallet);

    let accountTokens = await Alchemy.getAccountERC20Balance(settings, wallet, nativeTokens);

    let nonZeroTokens = await Alchemy.filterAccountTokens(accountTokens);

    let finalAcctTkns = await Alchemy.formatAccountTokens(nonZeroTokens);

    return res.json({
      'tokens': finalAcctTkns
    });
  },
  GET_WALLET_TRANSACTIONS: async (req,res) => {
    const { chain, network, wallet } = req.params;

    /** SET NETWORK RPC ENDPOINT */
    const settings = {};
    if (chain === 'ethereum' && network === 'mainnet')
      settings = { apiKey: process.env.ALCHEMY_API_KEY, network: Network.ETH_MAINNET };
    else if (chain === 'arbitrum' && network === 'mainnet')
      settings = { apiKey: process.env.ALCHEMY_API_KEY, network: Network.ARB_MAINNET };

    let transactions = await Alchemy.getAccountTransactions(settings, wallet, 50);
    
    let formattedTxs = await Alchemy.formatAccountTransactions(settings, wallet, transactions, chain);
  
    return res.json({
      'transactions': formattedTxs,
    });
  },
};
