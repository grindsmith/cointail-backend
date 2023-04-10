const bookshelf = require('../database.js');
const Groups = require('./groups');
const Wallets = require('./wallets');

let GroupWallets = bookshelf.Model.extend({
    tableName: 'group_wallets',
    hasTimestamps: true,
    groups: function () {
        return this.belongsTo(Groups);
    },
    wallets: function () {
        return this.belongsTo(Wallets);
    },
});

module.exports = bookshelf.model('GroupWallets', GroupWallets);