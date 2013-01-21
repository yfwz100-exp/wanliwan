var text = require('../models/user');


exports.postText = function postText(req, res) {
  return req.session.user;
}
