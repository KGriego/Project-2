const mongoose = require('mongoose');
const mongooseValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const md5 = require('md5');
const uuid = require('shortid');

const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

const UserSchema = new mongoose.Schema(
 {
  fname: {
   type: String,
   required: true
  },
  lname: {
   type: String,
   required: true
  },
  email: {
   type: String,
   required: true,
   unique: true
  },
  passwordHash: {
   type: String
  },
  apiToken: {
   type: String,
   unique: true
  }
 },
 {
  timestamps: true
 }
);
UserSchema.plugin(mongooseValidator);
UserSchema.virtual('password')
 .get(function() {
  return this.passwordHash;
 })
 .set(function(pass) {
  this._password = pass;
  this.passwordHash = bcrypt.hashSync(pass, 8);
 });
UserSchema.path('passwordHash').validate(function(pass) {
 if (this._password.length < 3) {
  this.invalidate('password', 'Password must be at least 8 characters');
 }
});
UserSchema.methods.validatePassword = function(password) {
 return bcrypt.compareSync(password, this.passwordHash);
};
UserSchema.pre('save', function(next) {
 // Allows us to just pass the form body directly to the model
 // and removes any properties that don't match the schema.
 for (prop in this) {
  if (!UserSchema.obj.hasOwnProperty(prop)) continue;
  delete this[prop];
 }
 next();
});
const User = mongoose.model('User', UserSchema);
module.exports = User;

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

// mongo connection
var Promise = require('bluebird');
mongoose.Promise = Promise;
var env = process.env.NODE_ENV || 'development';
var config = require('./config/mongo')[env];
module.exports = () => {
 var envUrl = process.env[config.use_env_variable];
 var localUrl = `mongodb://${config.host}/${config.database}`;
 var mongoUrl = envUrl ? envUrl : localUrl;
 return mongoose.connect(mongoUrl, { useMongoClient: true });
};