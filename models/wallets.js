const bookshelf = require('../database.js');

let Wallets = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
})

module.exports = bookshelf.model('Wallets', Wallets);