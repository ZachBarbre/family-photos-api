const enviroment = process.env.NODE_EVN || 'development';
const config = require('../knexfile')[enviroment];

module.exports = require('knex')(config);