/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 exports.up = function(knex) {
    return knex.schema.createTable('locations', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('address');
      table.string('city');
      table.decimal('Longitude', 10, 6); 
      table.decimal('Latitude', 10, 6);
      table.boolean('Rental').defaultTo(false);
      table.boolean('DayPass').defaultTo(false);
  
      table.timestamps(true, true);
    });
  };
  
 

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function(knex) {
    return knex.schema.dropTableIfExists('locations');
  };
