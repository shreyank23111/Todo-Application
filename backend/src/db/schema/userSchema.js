import mongoose from "mongoose";
const userMongoSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  userName:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  jwtToken: {
    type: String
  }
});

const User = mongoose.model("User", userMongoSchema);

module.exports = User;