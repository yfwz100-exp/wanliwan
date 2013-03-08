
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
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

  avatar: {
    type: String,
    'default': '/images/avatar/unknown.jpg'
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

userSchema.statics.getByEmail = function getByEmail(email, callback) {
  this.findOne({email: email}).exec(callback);
};

module.exports = mongoose.model('User', userSchema);

