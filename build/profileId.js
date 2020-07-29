"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var handleProfileId = function handleProfileId(db) {
  return function (req, res) {
    var id = req.params.id;
    db.select('*').from('users').where({
      id: id
    }).then(function (user) {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Sorry, no such user!!');
      }
    })["catch"](function (err) {
      return res.status(400).json('Error getting user');
    });
  };
};

var _default = handleProfileId; // module.exports={
//   handleProfileId:handleProfileId
// }

exports["default"] = _default;