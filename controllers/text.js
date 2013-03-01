var Text = require('../models/post');

exports.newTextView = function newTextView(req, res) {
  if (! req.xhr) {
    Post.find({
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
};

//发文本信息操作
exports.postText = function postText(req, res) {
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
          res.render('single-post', {
            post: text,
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
};
