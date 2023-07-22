const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uploadBlogSchema = new Schema({
  categoryid: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    return: true
  },
  liked: {
    type: Boolean,
    return: true
  },
  share: {
    type: Number,
    return: true
  },
  shared: {
    type: Boolean,
    return: true
  },
  icon: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("UploadBlog", uploadBlogSchema);