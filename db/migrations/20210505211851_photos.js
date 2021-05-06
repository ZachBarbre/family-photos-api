
exports.up = function(knex) {
  return knex.schema.createTable('photos', table => {
    table.increments()
    table.string('url').notNullable()
    table.integer('hearts').defaultTo(0)
    table.string('description')
    table.datetime('photo_date')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('photos')
};
