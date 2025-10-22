require('dotenv').config();

// Importing Dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// ⬇️ Destructure the exports you created
const { sequelize, initDatabase } = require('./config/connection');

const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Use env secret if available
const sess = {
  secret: process.env.SESSION_SECRET || 'dev-secret',
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1000 * 60 * 10,
    expiration: 1000 * 60 * 30,
  }),
};
app.use(session(sess));

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(routes);

// ⬇️ Initialize DB first, THEN start the server
(async () => {
  await initDatabase(); // authenticate + sync (uses your connection.js)
  app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}/`));
})();