
/**
 * Route for avatar.
 */

var photo= require('../controllers/photo');

module.exports = {
  get : photo.avatar.view,
  post: photo.avatar.post,
  
  'upload': require('../controllers/upload')({
    uploadDir: './public/uploads/avatar/',
    errorUrl: '/new/photo'
  })

};
