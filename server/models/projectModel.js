const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



module.exports = mongoose.model("Project", projectSchema);
