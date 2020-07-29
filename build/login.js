"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var handleLogin = function handleLogin(db, bcrypt) {
  return function (req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;

    if (!email || !password) {
      return res.status(400).json('Please fill the required fields');
    }

    db.select('email', 'hash').from('login').where('email', '=', email).then(function (data) {
      var isValid = bcrypt.compareSync(password, data[0].hash);

      if (isValid) {
        return db.select('*').from('users').where('email', '=', email).then(function (user) {
          res.json(user[0]);
        })["catch"](function (err) {
          return res.status(400).json('Unable to login');
        });
      } else {
        res.status(400).json('Wrong Login Details');
      }
    })["catch"](function (err) {
      return res.status(400).json('Wrong login details');
    });
  };
};

var _default = handleLogin; // module.exports ={
//     handleLogin:handleLogin
// }

exports["default"] = _default;