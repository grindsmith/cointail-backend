require('dotenv').config();

const GroupWallets = require('../models/groupWallets');
const express = require('express');
const router = express();

router.post('/api/group-wallets', async function postGroupWallet(req, res) {
  console.log('API Endpoint: postGroupWallet');

  const { walletId, groupId } = req.body;

  try {
    let foundGroupWallet = await GroupWallets.where({
      'wallet_id': walletId,
      'group_id': groupId
    }).fetch();

    return res.json({ groupWallet: foundGroupWallet });
  } catch (err) {
    if (err.message == 'EmptyResponse') {
      let saved = await new GroupWallets({ 
        'wallet_id': walletId, 
        'group_id': groupId, 
      }).save(); 

      return res.json({ groupWallet: saved });
    } else {
        console.log(err);
    }
  }
});

module.exports = router;
