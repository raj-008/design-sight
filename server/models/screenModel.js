const mongoose = require("mongoose");

const screenSchema = mongoose.Schema(
  {
    project_id: { type: mongoose.Schema.ObjectId, ref: "Project", required: true },
    path: { type: String, required: true, get: getFullUrl },
    meta_data: {
      width: { type: Number },
      height: { type: Number },
      mime_type: { type: Number },
      size: { type: String },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

function getFullUrl(path) {
  return process.env.APP_URI + "/" + path;
}

module.exports = mongoose.model("Screen", screenSchema);
