const bookshelf = require('../database.js');

let GroupWallets = bookshelf.Model.extend({
    tableName: 'group_users',
    hasTimestamps: true,
})

module.exports = bookshelf.model('GroupWallets', GroupWallets);