const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  eventName: {
    required: true,
    type: String
  },

  date: {
    required: true,
    type: String
  }
});

const Data = mongoose.model('Data', dataSchema)

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema)


module.exports = {User, Data};

