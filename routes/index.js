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

var home = require('../controllers/home')
  , user = require('../controllers/user')
  , auth = require('../controllers/auth')
  , text = require('../controllers/text')
  , photo= require('../controllers/photo')
  , music= require('../controllers/music')
  , video= require('../controllers/video')
  ;

module.exports = {
  get: home.index,

  'login': {
    get: auth.login.view,
    post: auth.login.post,
  },

  'logout': {
    all: auth.logout,
  },

  'register': {
    get: auth.register.view,
    post: auth.register.post,
  },

  'home': {
    '(*)': {
      all: auth.checkLogin,
    },

    get: user.home,

    'list': {
      get: user.homeList
    },
  
    'findfollow':{
      get : user.findFollowView,
      post: user.findFollow
    },

    'follow/:id': {
      get : user.follow 
    },

    'avatar': require('./avatar')
    
  },

  'new': {
    '(*)': {
      all: auth.checkLogin
    },

    'text': {
      get: text.post.view,
      post: text.post.post
    },
    'photo':{
      get : photo.postPhotoView,
      post: photo.postPhoto
    },
  },

  'del': {
    '(*)': {
      all: auth.checkLogin
    },
    ':uri(*)': {
      all: text.remove
    }
  },

  'homeb': {
    '(*)': {
      all: auth.checkLogin
    },
    get: user.homeb
  },

  'homec': {
    '(*)': {
      all: auth.checkLogin
    },
    get: user.homec
  },
  
  'homed': {
    '(*)': {
      all: auth.checkLogin,
    },

    get: user.homed,

    'list': {
      get: user.homeList
    },
  
    'findfollow':{
      get : user.findFollowView,
      post: user.findFollow
    },

    'follow/:id': {
      get : user.follow 
    },
    'forward/:id': {
      get : user.forward.view,
      post: user.forward.post
    },
    'avatar': require('./avatar')
    
  },


  'redirect': {
    get: function (req, res) {
      res.render('redirect', {
        message: 'check',
        link: '/',
        error: 1
      });
    }
  }
  
};

