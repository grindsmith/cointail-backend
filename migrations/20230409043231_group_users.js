/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('group_users', function (table) {
    table.increments('id').primary();
    table.integer('user_id').references('users.id');
    table.integer('group_id').references('groups.id')
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('group_users');
};
