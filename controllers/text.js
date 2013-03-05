
var Text = require('../models').Text
  , User = require('../models').User
  , async = require('async')
  ;

exports.post = {

  // 视图。相应HTTP GET操作。
  view: function view(req, res) {
    if (! req.xhr) {
      Text.find({
        author : {$in: req.session.user.followers}
      }).sort({date:-1}).populate('author').exec(function(err,posts){
        if (! posts) posts = [];
        res.render('newTextPage',{
          user  : req.session.user,
          posts : posts
        });
      });
    } else {
      res.render('newText');
    }
  },

  // 执行发表。相应HTTP POST操作。
  post: function post(req, res) {
    if(req.body.text.content){
      var text = new Text({
        content: req.body.text.content,
        author : req.session.user._id,
        uri    : Date.now().toString()+req.session.user.name
      });

      text.save(function (err, text){
        if(!err){
          if (! req.xhr) {
            res.render('redirect',{
              link:'/home',
              message:'成功发表一片文字！'
            });
          } else {
            var post = text.toJSON();
            post.author = req.session.user;
            res.render('posts-list', {
              posts: [post],
              user: req.session.user
            });
          } 
        }else{
          res.render('redirect', {
            link:'/new/text',
            message:  err,
            success: false
          });
        }
      });
    }
  }
};

exports.remove = function (req, res) {
  async.waterfall([
    function(callback) {
      Text.findOne({
        uri: req.params['uri']
      }, function (err, text) {
        if (text.author == req.session.user._id) {
          callback(null, text);
        } else {
          callback('Forbidden', null);
        }
      });
    },
    function(text, callback) {
      text.remove(callback);
    }
  ], function (err, result) {
    if (err) {
      if (req.xhr) {
        res.send({success: false, message: err});
      } else {
        res.render('redirect',{
          link: '/home',
          message: err,
          success: false,
        });
      }
    } else {
      if (req.xhr) {
        res.send({success: false, message: 'done!'});
      } else {
        res.render('redirect',{
          link: '/home',
          message: 'redirect!',
          success: true,
        });
      }
    }
  });
};
