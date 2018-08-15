const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

// server
app.use(bodyParser.urlencoded({ extended: true });
app.use(session({
  secret: 'Rick and Morty',
  saveUninitialized: false,
  resave: false
});
// view engine setup
const hbs = exphbs.create({
 defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.get('/login', (req, res) => {
  res.render('login');
});
app.listen(3000, () => {
  console.log('listening on port: 3000');
})

// Add mongoose requirements.
const mongoose = require('mongoose');
const connect = require('./mongo');
// Add the middleware
app.use(function(_, _, next) {
  if (!mongoose.connection.readyState) {
    connect().then(() => next());
    // async/await
    // await connect();
    // next();
  } else 
    next();
});
app.use(function(_, _, next) {
  if (mongoose.connection.readyState) {
    mongoose.disconnect();
  }
  next();
});

const passport = require('passport');
const serialization = require('./lib/serialization');
const localStrategy = require('./lib/strategies/local');

// Initialize passport.
passport.use(localStrategy);
// Set the serialization handlers.
passport.serializeUser(serialization.serializeUser);
passport.deserializeUser(serialization.deserializeUser);
// Finish up
app.use(passport.initialize());
app.use(passport.session());