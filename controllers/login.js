
var models = require('../models')
  , User = models.User
  ;

exports.login = {
  view: function (req, res) {
    res.render('login');
  },

  post: function (req, res) {
    var username = req.body.user.name;
    var password = req.body.user.pass;
    User.get(username, function(err, user) {
      if (user && username == user.name && password == user.password) {
        req.session.user = user.toJSON();
        res.render('redirect', {
          message: 'Successfully login!',
          link: '/home'
        });
      } else {
        res.render('error', {
          message: 'Wrong username or password...',
          link: '/login'
        });
      }
    });
  }
};

exports.logout = function (req, res) {
  req.session.user = null;
  res.render('redirect', {
    'link': '/login',
    'message': 'Successfully logout!'
  });
};
