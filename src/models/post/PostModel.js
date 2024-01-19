const { model, Schema } = require('mongoose');


const postSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },

}, {

  timestamps: {
    createdAt: 'published',
    updatedAt: 'updatedAt',
  },
  versionKey: false,
});

const Post = model('Post', postSchema);

module.exports = Post;