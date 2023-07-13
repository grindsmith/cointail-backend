const bookshelf = require('../database.js');
const Wallets = require('./wallets');

let WalletFollowers = bookshelf.Model.extend({
    tableName: 'wallet_followers',
    hasTimestamps: true,
    wallet: function () {
        return this.belongsTo(Wallets);
    },
    follower: function () {
        return this.belongsTo(Wallets);
    },
});

module.exports = bookshelf.model('WalletFollowers', WalletFollowers);