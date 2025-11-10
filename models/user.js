const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  lyrics: {
    type: String,
    required: true,
  },
  previewURL: {
    type: String,
    required: false,    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
music: [musicSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;