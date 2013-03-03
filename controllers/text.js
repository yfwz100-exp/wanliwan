
var Text = require('../models').Text;

exports.post = {

  // 视图。相应HTTP GET操作。
  view: function view(req, res) {
    if (! req.xhr) {
    Text.find({
      author : {$in:req.session.user.followers}
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
        uri    : Date.now()+req.session.user.name
      });

      text.save(function (err){
        if(!err){
          if (! req.xhr) {
            res.render('done',{
              link:'/home',
              message:'成功发表一片文字！'
            });
          } else {
            res.render('posts-list', {
              posts: [text],
              user: req.session.user
            });
          } 
        }else{
          res.render('error',{
            link:'/text',
            message:  err
          });
        }
      });
    }
  }
};
