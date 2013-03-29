
/**
 * Route for avatar.
 */

var photo= require('../controllers/photo');

module.exports = {
  get : photo.avatar.view,
  post: photo.avatar.post,
  
  'upload':{
    get : photo.upload.view,
    post: photo.upload.post,
  },
};
