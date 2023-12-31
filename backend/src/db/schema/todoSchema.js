import mongoose from "mongoose";


const todoMongoSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  }
});

const Todo = mongoose.model("Todo", todoMongoSchema);

module.exports = Todo;