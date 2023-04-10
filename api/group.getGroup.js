require('dotenv').config();

const express = require('express');
const router = express();

const GroupWallets = require('../models/groupWallets');
const Groups = require('../models/groups');

router.get('/api/group/:groupId', async function getGroup(req,res) {
  console.log('API Endpoints: getWalletsByGroup');
  
  const { groupId } = req.params;

  try {
    /**
     * STEP 1: RETRIEVE INFO ABOUT A SPECIFIC WALLET
     */
    const groupRaw = await Groups.where('id', groupId).fetch();

    let group = JSON.parse(JSON.stringify(groupRaw));

    /** 
     * STEP 2: RETRIEVE GROUPS RECORDS
     */
    let groupWalletsRaw = await GroupWallets.where('group_id', groupId).fetchAll({withRelated: ['wallets']});

    let groupWallets = await JSON.parse(JSON.stringify(groupWalletsRaw)).map((item) => item.wallets);

    return res.json({
      'info': group,
      'wallet': groupWallets
    });
  } catch (err) {
    if (err.message === 'EmptyResponse') {
      return res.send('No Group with this Id.')
    } else {
      console.error(err);

      return res.sendStatus(500);
    }
  }
});

module.exports = router;
