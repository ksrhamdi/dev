const mongoose = require('mongoose');

const UserSchema2 = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      unique: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1,
  
    unique: true
},
lastName: {
  type: String,
  required: true,
  minlength: 1,

  unique: true
},
userLogin: {
type: String,
required: true,
minlength: 1,

unique: true
},
  password: {
      type: String,
      required: true,
      minlength: 8
  },
  sessions: [{
      token: {
          type: String,
          required: true
      },
      expiresAt: {
          type: Number,
          required: true
      }
  }]
});

const Userr = mongoose.model('Userr', UserSchema2);

module.exports = { Userr }