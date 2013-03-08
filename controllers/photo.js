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
      fs.unlink(tmp_path);           
    }else{
      res.render('error',{
        link:'/new/photo',
        message:  err
      });
    }
  });
  
  var photo = new Photo({
    //content: req.body.photo.content,
    author : req.session.user._id,
    photo  : '/uploads/'+req.session.user.name+req.files.photo.name,
    uri    : Date.now()+req.session.user.name
  });

  photo.save(function (err){
    if(!err){
      res.render('redirect',{
        link:'/home',
        message:'成功发表一张图片！'
      });
    }else{
      res.render('redirect',{
        link:'/text',
        message:  err
      });
    }
      
  });
}


/*
 * 上传头像。
 */
 exports.avatar = {

  view: function (req, res) {
    res.render('avatar');
  },
};

exports.upload = {

  view: function (req, res) {
    res.render('upload', {
      callback: req.param('callback'),
      name: null
    });
  },

  /*
   * 
   */
  post: function (req, res) {
    var tmp_path = req.files.photo.path;
    var target_path = './public/uploads/'+req.session.user.name+req.files.photo.name;

    fs.rename(tmp_path,target_path,function(err){
      if(!err){
        fs.unlink(tmp_path);           
      }else{
        res.render('error',{
          link:'/new/photo',
          message:  err
        });
      }
    });

    res.render('upload', {
      callback: req.param('callback'),
      name: req.session.user.name+req.files.photo.name,
    });
  },

};


exports.uploadavatar = {
  post: function (req, res) {
    var type = req.body.post.type;
    var body = req.body.post.body;
    if (type && body) {
      var post = new model.post({
        author: req.session.user._id,
      });

      post.save(function(err) {
        if (err) {
          res.render('error', {msg: err, lnk:'/user'});
        } else {
          res.render('info', {msg: 'Done!', lnk:'/user'});
        }
      });
    } else {
      res.render('error', {msg: 'Wrong parameters.', lnk: '/user'});
    }
  }
};



