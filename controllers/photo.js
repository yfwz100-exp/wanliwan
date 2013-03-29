var Photo = require('../models/post');
var User = require('../models/user');
var async = require('async');
var imgk = require('imagemagick');
var fs = require('fs');

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

  post: function (req, res) {
    //var type = req.body.post.type;

    if (req.body) {
      var path = __dirname+'/../public/uploads/avatar/'+req.body.photo.path;
      var rw = req.body.photo.w;
      var rh = req.body.photo.h;
      var cx  = req.body.clip.x;
      var cy  = req.body.clip.y;
      var cw  = req.body.clip.w;
      var ch  = req.body.clip.h;

      async.parallel({
        user: function(callback) {
          User.findOne({_id:req.session.user._id}, callback);
        },
        avatar: function(callback) {
          imgk.convert(
            [path,'-resize', rw+'x'+rh, 
                  '-crop',   cw+'x'+ch+'+'+cx+'+'+cy, 
             path]
          , function (err, stdout) {
            if (err) throw err;
            callback(null, path);
          });
        }
      }, function(err, results) {
        var avatar = '/uploads/avatar/'+req.body.photo.path;
        var user = results.user;
        user.avatar = avatar;
        user.save(function (err, user) {
          req.session.user = user.toJSON();
          res.render('redirect', {
            message:'Done',
            link:'/home',
            error: err
          });
        });
      });
      
    } else {
      res.render('error', {msg: 'Wrong parameters.', lnk: '/user'});
    }
  }

};

exports.upload = {

  view: function (req, res) {
    res.render('avatar/upload', {
      callback: req.param('callback'),
      name: null
    });
  },

  post: function (req, res) {
    var tmp_path = req.files.photo.path;
    var target_path = './public/uploads/avatar/'+req.session.user.name+req.files.photo.name;
    fs.rename(tmp_path, target_path, function(err){
      if (!err) {
        res.render('avatar/upload', {
          callback: req.param('callback'),
          name: req.session.user.name+req.files.photo.name,
        });
        fs.unlink(tmp_path);
      } else {
        res.render('error', {
          link:'/new/photo',
          message: err
        });
      }
    });

  },

};

