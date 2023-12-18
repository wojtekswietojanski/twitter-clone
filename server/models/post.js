const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema({
  username: { type: String },
  postContent: { type: String },
  imgUrl: { type: String },
  todayDate: { type: String },
});

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
