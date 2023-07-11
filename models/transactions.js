const bookshelf = require('../database.js');

let Transactions = bookshelf.Model.extend({
    tableName: 'transactions',
    hasTimestamps: true,
})

module.exports = bookshelf.model('Transactions', Transactions);