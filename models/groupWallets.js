const bookshelf = require('../database.js');
const Groups = require('./groups');
const Wallets = require('./wallets');
const WalletTransactions = require('./walletTransactions.js');

let GroupWallets = bookshelf.Model.extend({
    tableName: 'group_wallets',
    hasTimestamps: true,
    group: function () {
        return this.belongsTo(Groups);
    },
    wallet: function () {
        return this.belongsTo(Wallets);
    }
});

module.exports = bookshelf.model('GroupWallets', GroupWallets);