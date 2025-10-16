const { Sequelize } = require('sequelize');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

async function initDatabase({ syncOptions } = {}) {
  try {
    await sequelize.authenticate();
    await sequelize.sync(syncOptions);
    console.log('Database connected & synced.');
  } catch (err) {
    console.error('Database init failed:', err);
    process.exit(1);
  }
}

module.exports = { sequelize, initDatabase };
