const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL || process.env.CLEARDB_DATABASE_URL) {
  sequelize = new Sequelize(
    process.env.JAWSDB_URL || process.env.CLEARDB_DATABASE_URL,
    { dialect: 'mysql', logging: false }
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
    }
  );
}

module.exports = sequelize;
