
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
    var email = req.body.user.email;
    var password = req.body.user.password;
    User.getByEmail(email, function(err, user) {
      if (user && email == user.email && password == user.password) {
        req.session.user = user;
        res.render('redirect', {
          success: true,
          link: '/homeb',
          message: '登陆成功！'
        });
      } else {
        res.render('redirect', {
          success: false,
          link: '/login',
          message: '密码或用户名不正确！'
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
