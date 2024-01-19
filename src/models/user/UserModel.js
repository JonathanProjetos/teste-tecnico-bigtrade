const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }

},{
  versionKey: false
});

const User = model('User', userSchema);

module.exports = User;