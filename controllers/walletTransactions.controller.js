require('dotenv').config();

// Database Models
const Transactions = require('../models/transactions');

// Helpers
const TransactionsHelper = require('../helpers/transactions.helper');

module.exports = {
  getTransactions: async function (req, res) {
    // Step 1: Get the desired walletAddress
    const { address, groupId } = req.params;

    // Step 2: Query walletNotifications for all notifications where walled_id = walletAddress

    // Step 3: Return list
  },
  postTransaction: async function (req,res) {
    console.log(`API Endpoints: postTransaction from ${req.body.event.network} Network`);

    let walletAddresses = await TransactionsHelper.findWalletsInTransaction(req.body.event.activity);

    let wallets = await TransactionsHelper.findDatabaseWallets(walletAddresses);

    if (wallets.length > 0)
    {
      // Step 2: Create New Wallet Transaction Records
      for (let i = 0; i < req.body.event.activity.length; i++) 
      {
        if (walletAddresses.includes(req.body.event.activity[i].fromAddress) || walletAddresses.includes(req.body.event.activity[i].toAddress)) 
        {
          // Step 3: Create Transaction Record
          let tx = {
            'block_num': req.body.event.activity[i].blockNum,
            'hash': req.body.event.activity[i].hash,
            'from_address': req.body.event.activity[i].fromAddress,
            'to_address': req.body.event.activity[i].toAddress,
            'network': req.body.event.network,
            'value': req.body.event.activity[i].value,
            'asset': req.body.event.activity[i].asset,
            'category': req.body.event.activity[i].category,
            'contract_address': req.body.event.activity[i].log?.address || '',
          }

          let transactionRaw = await new Transactions(tx).save();

          let transaction = JSON.parse(JSON.stringify(transactionRaw));

          // Step 4: Create Wallet_x_Transaction Record
          if (walletAddresses.includes(req.body.event.activity[i].fromAddress)) 
          {
            await TransactionsHelper.createWalletTransaction(wallets, req.body.event.activity[i].toAddress, transaction);
          }
          
          if (walletAddresses.includes(req.body.event.activity[i].toAddress)) 
          {
            await TransactionsHelper.createWalletTransaction(wallets, req.body.event.activity[i].fromAddress, transaction);
          }
        }
      }
    }
    
    return res.sendStatus(200);
  }
}
