var home = require('../controllers/home')
  , user = require('../controllers/user')
  , text = require('../controllers/text')
  , test = require('../controllers/tests');

/**
 * URL 路由配置。
 *
 * 这里的URL路由使用JSON格式控制的，关于JSON格式的标准，可以参见http://json.org，但这里并没有完全按照标准来用。
 *
 * 总的来说，一个URL地址可以这么来写
 * 例如，要配置 /home/user/1234 ，那么，在这个文件中可以
 * {
 * '/': {
 *   'home': {
 *     get: controller1,
 *     post: controller2,
 *     all: controller3,
 *
 *     '/': {
 *       'user': {
 *         get: controller4,
 *         post: controller5,
 *
 *         '/': {
 *           '1234': {
 *             get: controller6
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 * }
 * 也就是说，其中的controller只是一个例子，并不一定每一个地址都有controller对应。这里的配置也像文件夹那样，是层层嵌套的。
 *
 */

module.exports = {
  get: home.index,

  users: {
  },

  'login': {
    get: user.loginView,
    post: user.login,
  },

  'logout': {
    all: user.logout,
  },

  'register': {
    get: user.registerView,
    post: user.register
  },

  'home': {
    all: user.checkLogin,
    get: user.home
  },

  'text': {
    all : user.checkLogin,
    get : text.postTextView,
    post: text.postText
  },
  'findfollow':{
    all : user.checkLogin,
    get : user.findFollowView,
    post: user.findFollow
  },
  'follow/:id': {
    all : user.checkLogin,
    get : user.follow 
  }
};
