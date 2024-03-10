const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;
const store = new SequelizeStore({
  db: sequelize,
});

// Set up session with Sequelize store
app.use(
  session({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

// Set up Handlebars.js as the template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.static('public'));

// Set up routes (to be implemented)
app.get('/', (req, res) => {
  res.render('home');
});

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
