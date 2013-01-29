var Photo = require('../models/post');
var fs    = require('fs');

exports.postPhotoView = function postPhotoView(req,res){
  res.render('postPhoto');
}

//发布图片
exports.postPhoto = function postPhoto(req,res){
  var tmp_path    = req.files.photo.path;
  var target_path = './public/uploads/'+req.session.user.name+req.files.photo.name;

  fs.rename(tmp_path,target_path,function(err){
    if(!err){
      fs.unlink('./'+tmp_path);           
    }else{
      res.render('error',{
        link:'/photo',
        message:  err
      });
    }
  });
  
  var text = new Text({
    content: req.body.text.content,
    author : req.session.user._id,
    uri    : Date.now()+req.session.user.name
  });

  text.save(function (err){
    if(!err){
      res.render('done',{
        link:'/home',
        message:'成功发表一张图片！'
      });
    }else{
      res.render('error',{
        link:'/text',
        message:  err
      });
    }
      
  });
}
