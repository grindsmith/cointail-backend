require('dotenv').config();

const express = require('express');
const router = express();
const Groups = require('../models/groups');

router.get('/api/group', async function getAllGroups(req,res) {
  console.log('API Endpoints: getAllGroups');
  
  try {
    /**
     * STEP 1: RETRIEVE INFO ABOUT A SPECIFIC WALLET
     */
    const allGroups = await Groups.fetchAll();

    return res.json({
      'allGroups': allGroups
    });
  } catch (err) {
    if (err.message === 'EmptyResponse') {
      return res.send('No Groups.')
    } else {
      console.error(err);

      return res.sendStatus(500);
    }
  }
});

module.exports = router;
