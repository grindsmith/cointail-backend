require('dotenv').config();

const express = require('express');
const router = express();

const NodeMailerServices = require('../services/nodemailer/nodemailer.services');

router.post('/api/notify', async function postWalletTransaction(req,res) {
  console.log('API Endpoints: postWalletTransaction');

  console.log(req.body);
  console.log(req.body.event);

  // await NodeMailerServices.sendEmail('esmith.wagmi@gmail.com');

  return res.send('RESPONSE: GET_NOTIFICATION_FROM_ALCHEMY');
})

module.exports = router;
