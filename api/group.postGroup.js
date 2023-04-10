require('dotenv').config();

const Groups = require('../models/groups');
const express = require('express');
const router = express();

router.post('/api/group', async function postGroup(req, res) {
  console.log('API Endpoint: postGroup');

  const { name, description, ownerId } = req.body;

  try {
    let foundGroup = await Groups.where('name', name).fetch();

    return res.json({ group: foundGroup });
  } catch (err) {
    if (err.message == 'EmptyResponse') {
      let saved = await new Groups({ 
        'name': name, 
        'description': description, 
        'ownerId': ownerId
      }).save(); 

      return res.json({ wallet: saved });
    } else {
        console.log(err);
    }
  }
});

module.exports = router;
