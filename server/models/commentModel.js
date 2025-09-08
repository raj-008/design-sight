const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    screen_id: { type: mongoose.Schema.ObjectId, ref: "Screen", required: true },
    parent_id: { type: mongoose.Schema.ObjectId, ref: "Comment", default: null },
    message: { type: String, required: true },
    author: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
