/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('wallet_followers', function (table) {
    table.increments('id').primary();
    table.integer('wallet_id').references('wallets.id');
    table.integer('follower_id').references('wallets.id');
    table.boolean('email_notification').defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('wallet_followers');
};
