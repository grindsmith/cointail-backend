const bookshelf = require('../database.js');
const Wallets = require('./wallets');

let WalletFollowers = bookshelf.Model.extend({
    tableName: 'wallet_followers',
    hasTimestamps: true,
    wallets: function () {
        return this.belongsTo(Wallets);
    },
    followers: function () {
        return this.belongsTo(Wallets);
    },
});

module.exports = bookshelf.model('WalletFollowers', WalletFollowers);