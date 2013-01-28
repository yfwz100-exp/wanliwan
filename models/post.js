var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  // 转发层次；为空即原创
  parent: [String],
  // 文字内容
  content: {
    type: String
  },
  // 作者的Email 
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  //保存的
  photo:[String],

  music:[String],

  video:[String],

  // 该文字的状态，如果需要审核，可为未审核状态。
  state: String,
  // 发表日期
  date: {
    type: Date,
    'default': Date.now
  },
  // 标签列表
  tag: [String],
  // 访问该 text 的唯一标识符
  uri: {
    type: String,
    unique: true
  }
});

// 以 uri 的字典顺序建立索引
postSchema.index({
  uri: 1
});

postSchema.virtual('html').get(function () {
  return require('markdown').markdown.toHTML(body);
});

postSchema.statics.list = function list(options, callback) {
  this.find(options.find).sort(options.sort).populate('author').exec(callback);
};

module.exports = mongoose.model('Post', postSchema);
