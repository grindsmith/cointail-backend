require('dotenv').config();

const Wallets = require('../models/wallets');
const express = require('express');
const router = express();

router.put('/api/wallet', async function putWallet(req,res) {
  console.log('API Endpoint: putWallet');

  const { wallet, name } = req.body;

  try {
      const updated = await Wallets.where('address', wallet).fetch();
      
      const saved = await updated.save({ 'name': name },{ method: 'update' });

      return res.json({ saved });
  } catch (error) {
      console.log('Error: ', error.message);
      
      return res.json({ error });
  }
});

module.exports = router;
