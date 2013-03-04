
/*
 * GET users listing.
 */

var User = require('../models/user');
var Post = require('../models/post');

exports.list = function(req, res){
  if (req.session.user) {
    res.render('list', {
      user: req.session.user,
      layout: 'layout'
    });
  } else {
    res.redirect('/login');
  }
};

exports.registerView = function registerView(req, res) {
  res.render('register');
};
exports.register = function register(req, res) {
  if (req.body.user.name && req.body.user.pass && req.body.user.repass
      && req.body.user.pass == req.body.user.repass) {
    var user = new User({
      name: req.body.user.name,
      password:req.body.user.pass,
    });

    user.save(function (err, user) {
      user.followers.push(user._id);
      user.save(function (err, user) {
        if (! err) {
          res.render('done', {
            link: '/login',
            message: 'Successfully register!'
          });
        } else {
          res.render('error', {
            link: '/register',
            message: err
          });
        }
      });
    });
   
  } else {
    req.render('done', {
      link: '/login',
      message: 'The user has been registered.'
    });
  }
};

exports.home = function home(req, res) {
  Post.find({
    author : {$in:req.session.user.followers}
  }).sort({date:-1}).populate('author').exec(function(err,posts){
    if (! posts) posts = [];
    res.render('homeb',{
      user  : req.session.user,
      posts : posts
    });
  });
}

//begin  for testing
exports.homeb = function homeb(req, res) {
  Post.find({
    author : {$in:req.session.user.followers}
  }).sort({date:-1}).populate('author').exec(function(err,posts){
    if (! posts) posts = [];
    res.render('homeb',{
      user  : req.session.user,
      posts : posts
    });
  });
};
exports.homeList = function homeList(req, res) {
  if (req.xhr) {
    Post.find({
      author : {$in:req.session.user.followers}
    }).sort({date:-1}).populate('author').exec(function(err,posts){
      if (! posts) posts = [];
      res.render('posts-list', {
        user: req.session.user,
        posts: posts
      });
    });
  } else {
    res.render('error', {
      link: '/login',
      message: 'The user has been registered.'
    });
  }
};
//end  for testing

exports.findFollowView = function findFollowView(req, res) {
  User.find({
    _id :{$nin:req.session.user.followers}
  },function(err,users){
    if(! users) users = [];
    res.render('findFollow',{
      users : users
    });
  });
}

exports.findFollow = function findFollow(req, res){
  
}

exports.follow = function follow(req,res){
  var id = req.params.id;
  var user = req.session.user;
  console.log(id);
  User.get(user.name, function(err, user) {
    user.followers.push(id);
    user.save(function (err) {
      if (! err) {
        req.session.user = user;
        res.render('done', {
          link: '/home',
          message: 'Successfully 关注!'
        });
      } else {
        res.render('error', {
          link: '/findfollow',
          message:"添加关注失败，请重新添加..."
        });
      }
    });
  });
}
