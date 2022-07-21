require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.HOSTNAME,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'pet_trybe_test',
    host: process.env.HOSTNAME,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
  },
};