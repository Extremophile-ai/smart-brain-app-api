"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getUsers = function getUsers(db) {
  return function (req, res) {
    db.select('*').from('users').orderBy('id', 'asc').then(function (users) {
      // console.log(users)
      res.json(users);
    })["catch"](function (err) {
      return res.status(400).json('Unable to get users');
    });
  };
};

var _default = getUsers; // module.exports={
//     getUsers:getUsers
// }

exports["default"] = _default;