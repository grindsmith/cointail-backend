
// Database Models
const Wallets = require('../models/wallets');

// Helpers
const WalletHelpers = require('./wallets.helper');

/** findWalletsInTransaction: Find Wallet Addresses that took part in a transaction (sent from Alchemy) */
async function findWalletsInTransaction (activity) {
  let fromWallets = activity.map((act) => act.fromAddress);

  let toWallets = activity.map((act) => act.toAddress);

  let walletAddresses = fromWallets.concat(toWallets).map((item) => item.toLowerCase())

  console.log(`INFO: ${walletAddresses.length} Wallets In Transaction`);

  return walletAddresses;
}

/** findDatabaseWallets: Find Wallet Addresses that exist in the database */
async function findDatabaseWallets (walletAddresses) {
  let walletsDB = await Wallets.where('address','in', walletAddresses).fetchAll();

  let wallets = JSON.parse(JSON.stringify(walletsDB))

  console.log(`INFO: ${wallets.length} Matching Database Wallets Found`);

  return wallets;
}


/** createWalletTransaction: create a WalletTransaction record using the wallet.id & transaction.id */
async function createWalletTransaction (wallets, address, transaction) {
  console.log(`INFO: Create Wallet Transaction for ${address}`);

  let fromWallet = await WalletHelpers.findWalletInArrayByAddress(wallets, address)

  let walletTransaction = await new WalletTransactions({ 'wallet_id': fromWallet.id, 'transaction_id': transaction.id }).save();

  return walletTransaction;
}

module.exports = {
  findWalletsInTransaction,
  findDatabaseWallets,
  createWalletTransaction
}