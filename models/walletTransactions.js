const bookshelf = require('../database.js');
const Wallets = require('./wallets.js');
const Transactions = require('./transactions.js');

let WalletTransactions = bookshelf.Model.extend({
    tableName: 'wallet_transactions',
    hasTimestamps: true,
    wallet: function () {
        return this.belongsTo(Wallets);
    },
    transaction: function () {
        return this.belongsTo(Transactions);
    },
});

module.exports = bookshelf.model('WalletTransactions', WalletTransactions);