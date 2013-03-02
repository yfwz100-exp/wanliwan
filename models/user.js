
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  followers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  pic: {
    type: String,
    'default': '/uploads/unknown.png'
  },
  description: String,
  verified: {
    type: Boolean,
    'default': false
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

userSchema.statics.get = function get(username, callback) {
  this.findOne({name: username}).exec(callback);
};

module.exports = mongoose.model('User', userSchema);

