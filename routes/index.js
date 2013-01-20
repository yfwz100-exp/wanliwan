/**
 * 这里是url的路由配置
 *
 * 所有的 url 分发都在此编写。
 */

var home = require('../controllers/home')
  , user = require('../controllers/user')
  , test = require('../controllers/tests');

exports.init = function init(app) {
  app.get('/', home.index);
  app.get('/andex',home.andex);
  
  app.get('/tests', test.index);

  app.get('/users', user.list);

  app.get('/login', user.loginView);
  app.post('/login', user.login);
  app.all('/logout', user.logout);

  app.get('/register', user.registerView);
  app.post('/register', user.register);
  
  app.get('/home', user.home);
 };

