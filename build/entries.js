"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleApiCall = exports.handleEntries = void 0;

var _clarifai = _interopRequireDefault(require("clarifai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = new _clarifai["default"].App({
  apiKey: '203ada3476814a199357484e55133ff3'
});

var handleApiCall = function handleApiCall(req, res) {
  app.models.predict(_clarifai["default"].FACE_DETECT_MODEL, req.body.input).then(function (data) {
    res.json(data);
  })["catch"](function (err) {
    return res.status(400).json('API error!');
  });
};

exports.handleApiCall = handleApiCall;

var handleEntries = function handleEntries(req, res, db) {
  var id = req.body.id;
  db('users').where('id', '=', id).increment('entries', 1).returning('entries').then(function (entries) {
    res.json(entries[0]);
  })["catch"](function (err) {
    return res.status(400).json('Unable to get entries');
  });
}; // module.exports ={
//     handleEntries:handleEntries,
//      handleApiCall:handleApiCall
// }


exports.handleEntries = handleEntries;