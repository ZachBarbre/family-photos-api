
exports.up = function(knex) {
  return knex.schema.createTable('photos', table => {
    table.increments()
    table.json('spaces').notNullable()
    table.string('description')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('photos')
};
