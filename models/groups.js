const bookshelf = require('../database.js');

let Groups = bookshelf.Model.extend({
    tableName: 'groups',
    hasTimestamps: true,
})

module.exports = bookshelf.model('Groups', Groups);