//这里是url的路由配置

var  routes = require('./routes')
  , user = require('./routes/user')
  , tests = require('./routes/tests');

exports.initRoute = function initRoute(app) {
  app.get('/', routes.index);
  app.get('/tests', tests.index);

  app.get('/users', user.list);

  app.get('/login', user.loginView);
  app.post('/login', user.login);
  app.all('/logout', user.logout);

  app.get('/register', user.registerView);
  app.post('/register', user.register);
}

