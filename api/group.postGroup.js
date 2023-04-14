require('dotenv').config();

const express = require('express');
const router = express();

const Groups = require('../models/groups');
const GroupWallets = require('../models/groupWallets');
const WalletServices = require('../services/wallet.services');

router.post('/api/group', async function postGroup(req, res) {
  console.log('API Endpoint: postGroup');

  const { name, description, address } = req.body;

  const walletRaw = await WalletServices.findOrCreateWallet(address);

  const wallet = JSON.parse(JSON.stringify(walletRaw));

  try {
    const newGroupRaw = await new Groups({
      'name': name,
      'description': description,
    }).save();

    const newGroup = JSON.parse(JSON.stringify(newGroupRaw));
    
    await new GroupWallets({
      'group_id': newGroup.id,
      'wallet_id': wallet.id,
      'group_owner': true
    }).save();

    let allGroups = await Groups.fetchAll();

    return res.json({ 'groups': allGroups })
  } catch (err) {
    console.error('Error: Group Creation Issue.', err.message);

    return err;
  }
});

module.exports = router;
