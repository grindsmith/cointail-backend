require('dotenv').config();
const CoinMarketCap = require('../services/coinmarketcap.services');
const DexScreener = require('../services/dexscreener.services');

module.exports = {
  getTokenPairs: async (req,res) => {
    console.log('GET_ETHEREUM_TOKEN_PAIRS');
    
    const { symbol } = req.params;

    let pairs = await DexScreener.getDexScreenerPairs(symbol);

    let formattedPairs = await DexScreener.formatDexScreenerPairs(pairs);

    res.json({
      'pairs': formattedPairs
    });
  },
  getTokenCategories: async (req,res) => {
    let categories = await CoinMarketCap.getCoinMarketCapCategories();

    let formattedCategories = await CoinMarketCap.formatCoinMarketCapCategories(categories);

    return res.json({
      'categories': formattedCategories
    });
  },
};