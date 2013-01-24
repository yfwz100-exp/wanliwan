var Text = require('../models/text');


exports.postTextView = function postText(req, res) {
  res.render('postText');
}

//发文本信息操作
exports.postText = function postTextView(req, res) {
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
