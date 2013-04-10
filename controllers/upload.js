
/**
 * The upload middle ware.
 */

var imgk = require('imagemagick')
  , fs = require('fs')
  , async = require('async')
  , path = require('path')
  ;

/**
 * The actual upload handler.
 */
module.exports = function (option) {
  var uploadDir = option.uploadDir;
  var errorUrl = option.errorUrl;

  return {

    get: function (req, res) {
      res.render('hidden-upload-frame', {
        actionUrl: req.path,
        callback: req.param('callback'),
        name: null
      });
    },

    post: function (req, res) {
      var tmp_path = req.files.photo.path;
      var target_path = path.join(uploadDir, req.session.user.name+req.files.photo.name);
      fs.rename(tmp_path, target_path, function(err){
        if (!err) {
          res.render('hidden-upload-frame', {
            actionUrl: req.path,
            callback: req.param('callback'),
            name: req.session.user.name+req.files.photo.name,
          });
          fs.unlink(tmp_path);
        } else {
          res.render('error', {
            link: errorUrl,
            message: err
          });
        }
      });
    }

  };

};

