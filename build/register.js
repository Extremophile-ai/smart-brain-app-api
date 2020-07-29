"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var handleRegister = function handleRegister(db, bcrypt) {
  return function (req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        name = _req$body.name,
        password = _req$body.password,
        entries = _req$body.entries;

    if (!email || !name || !password) {
      return res.status(400).json('Please fill the required fields');
    }

    var hash = bcrypt.hashSync(password);
    db.transaction(function (trx) {
      trx.insert({
        hash: hash,
        email: email
      }).into('login').returning('email').then(function (loginEmail) {
        return trx('users').returning('*').insert({
          name: name,
          email: loginEmail[0],
          joined: new Date(),
          entries: entries
        }).then(function (user) {
          res.json(user[0]);
        });
      }).then(trx.commit)["catch"](trx.rollback);
    })["catch"](function (err) {
      return res.status(400).json('Unable to register');
    });
  };
};

var _default = handleRegister; // module.exports={
//     handleRegister:handleRegister
// }

exports["default"] = _default;