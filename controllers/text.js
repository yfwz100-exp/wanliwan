var Text = require('../models/post');


exports.newText = function newText(req, res) {
  res.render('newText');
}

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
        res.render('done',{
          link:'/home',
          message:'成功发表一片文字！'
        });
      }else{
        res.render('error',{
          link:'/text',
          message:  err
        });
      }
      
    });

  }
};
