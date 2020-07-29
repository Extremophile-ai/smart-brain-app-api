"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _cors = _interopRequireDefault(require("cors"));

var _pg = _interopRequireDefault(require("pg"));

var _knex = _interopRequireDefault(require("knex"));

var _register = _interopRequireDefault(require("../build/register"));

var _login = _interopRequireDefault(require("../build/login"));

var _profileId = _interopRequireDefault(require("../build/profileId"));

var _entries = require("../build/entries");

var _users = _interopRequireDefault(require("../build/users"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])(); // const db = knex({
//     client: 'pg',
//     connection: {
//       host : '127.0.0.1', 
//       user : 'postgres',
//       password : 'Power1050',
//       database : 'smart_brain'
//     }
//   });

var db = (0, _knex["default"])({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: ['knex', 'public']
});
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.get('/', function (req, res) {
  res.send('Welcome!');
});
app.get('/users', (0, _users["default"])(db));
app.post('/login', (0, _login["default"])(db, _bcryptNodejs["default"]));
app.post('/register', (0, _register["default"])(db, _bcryptNodejs["default"]));
app.get('/profile/:id', (0, _profileId["default"])(db));
app.put('/entries', function (req, res) {
  _entries.handleEntries.handleEntries(req, res, db);
});
app.post('/imageUrl', function (req, res) {
  (0, _entries.handleApiCall)(req, res);
});
app.listen(process.env.PORT || 3005, function () {
  console.log('Server started!!');
});