/**
 * 这里是url的路由配置
 *
 * 所有的 url 分发都在此编写。
 */

var home = require('./home')
  , user = require('./user')
  , test = require('./tests');

exports.init = function init(app) {
  app.get('/', home.index);
  app.get('/tests', test.index);

  app.get('/users', user.list);

  app.get('/login', user.loginView);
  app.post('/login', user.login);
  app.all('/logout', user.logout);

  app.get('/register', user.registerView);
  app.post('/register', user.register);
}

