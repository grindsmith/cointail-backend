/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('transactions', function (table) {
    table.increments('id').primary();
    table.string('block_num');
    table.string('hash');
    table.string('to_address');
    table.string('from_address');
    table.string('network');
    table.decimal('value', null);
    table.string('asset');
    table.string('category');
    table.string('contract_address');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
