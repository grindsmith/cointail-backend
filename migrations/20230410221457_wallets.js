/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('wallets', function (table) {
    table.increments('id').primary();
    table.string('address').unique();
    table.string('name');
    table.string('chain');
    table.string('phone');
    table.string('email');
    table.timestamps(true, true);
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('wallets');
};
