
/*
 * GET users listing.
 */

var User = require('../my_modules/user');

exports.checkLogin = function checkLogin(req, res) {
  return req.session.user;
}

exports.list = function(req, res){
  if (req.session.user) {
    res.render('list', {
      user: req.session.user,
      layout: 'layout'
    });
  } else {
    res.redirect('/login');
  }
};

exports.registerView = function registerView(req, res) {
  res.render('register');
};
exports.register = function register(req, res) {
  if (req.body.user.name && req.body.user.pass && req.body.user.repass
      && req.body.user.pass == req.body.user.repass) {
    var user = new User({
      name: req.body.user.name,
      password:req.body.user.pass
    });
    user.save(function (err) {
      if (! err) {
        res.render('done', {
          link: '/login',
          message: 'Successfully register!'
        });
      } else {
        res.render('error', {
          link: '/register',
          message: err
        });
      }
    });
  } else {
    req.render('done', {
      link: '/login',
      message: 'The user has been registered.'
    });
  }
};

exports.loginView = function loginView(req, res) {
  res.render('login');
};
exports.login = function login(req, res) {
  var username = req.body.user.name;
  var password = req.body.user.pass;
  User.get(username, function(err, user) {
    if (user && username == user.name && password == user.password) {
      req.session.user = user;
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
};

exports.logout = function logout(req, res) {
  req.session.user = null;
  res.render('done', {
    'link': '/login',
    'message': 'Successfully logout!'
  });
}

exports.home = function home(req, res) {
  res.render('home',{});
}
