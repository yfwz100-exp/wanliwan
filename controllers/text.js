var text = require('../my_modules/user');


exports.postText = function postText(req, res) {
  return req.session.user;
}
