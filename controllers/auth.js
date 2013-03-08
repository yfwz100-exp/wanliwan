
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
          link: '/home',
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
  res.render('redirect', {
    'link': '/login',
    'message': '你正在退出...'
  });
};

/*
 * 测试是否已经登陆。
 */
exports.checkLogin = function (req, res, next) {
  if (! req.session.user.email) {
    return res.redirect('/login');
  } else {
    next();
  }
};


/*
* 
*/
exports.register = {
  view: function (req, res) {
    res.render('register');
  },

  post: function(req, res) {

    if (req.body.user.email && req.body.user.password) {
      User.getByEmail(req.body.user.email, function(err, user) {
        if (user) {
          res.render('redirect', {
            success: false,
            message: '该邮箱已注册!',
            link: '/register'
          });
        } else {
          var user = new User({
            name : req.body.user.name,
            email: req.body.user.email,
            password: req.body.user.password,
            description: req.body.user.description,  
          });

          user.save(function (err, user) {
            user.followers.push(user._id);
            user.save(function (err, user) {
              if (! err) {
                res.render('redirect', {
                  success: true,
                  link: '/login',
                  message: '注册成功！'
                });
              } else {
                res.render('redirect', {
                  success: false,
                  link: '/register',
                  message: "注册失败(数据写入失败)..."
                });
              }
            });
          });    
        }
      });
    }    
  }
};

