require('dotenv').config();

const Wallets = require('../models/wallets');
const express = require('express');
const router = express();

router.post('/api/wallet', async function postWallet(req, res) {
  console.log('API Endpoint: postWallet');

  const { address } = req.body;

  try {
    let foundWallet = await Wallets.where('address', address).fetch();

    return res.json({ wallet: foundWallet });
  } catch (err) {
    if (err.message == 'EmptyResponse') {
        let saved = await new Wallets({ 
            address: address, 
            chain: 'ethereum', 
            name: 'Placeholder'
      }).save(); 

      return res.json({ wallet: saved });
    } else {
        console.log(err);
    }
  }
});

module.exports = router;
