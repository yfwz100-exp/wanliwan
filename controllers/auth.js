
var models = require('../models')
  , User = models.User
  ;

/**
 * 登陆模块。
 */
exports.login = {

  /*
   * 显示视图控制器。
   */
  view: function (req, res) {
    res.render('login');
  },

  /*
   * 相应登陆动作。
   */
  post: function (req, res) {
    var username = req.body.user.name;
    var password = req.body.user.pass;
    User.get(username, function(err, user) {
      if (user && username == user.name && password == user.password) {
        req.session.user = user.toJSON();
        res.render('done', {
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

/*
 * 响应登出动作。
 */
exports.logout = function (req, res) {
  req.session.user = null;
  res.render('done', {
    'link': '/login',
    'message': 'Successfully logout!'
  });
};

/*
 * 测试是否已经登陆。
 */
exports.checkLogin = function (req, res, next) {
  if (! req.session.user) {
    return res.redirect('/login');
  } else {
    next();
  }
};
