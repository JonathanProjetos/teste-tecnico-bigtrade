const { Schema, connection } = require('mongoose');
const autoIncremente = require('mongoose-auto-increment');

autoIncremente.initialize(connection);

const userSchema = new Schema({
  id: {
    type: Number, 
    ref: 'User',
    required: true,
    unique: true
  },
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

userSchema.plugin(autoIncremente.plugin, {
  model: 'User',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

const User = connection.model('User', userSchema);

module.exports = User;