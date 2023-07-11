/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('wallet_transactions', function (table) {
    table.increments('id').primary();
    table.integer('wallet_id').references('wallets.id');
    table.integer('transaction_id').references('transactions.id');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('wallet_transactions');
};
