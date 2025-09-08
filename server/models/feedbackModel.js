const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    screen_id: { type: mongoose.Schema.Types.ObjectId, ref: "Screen", required: true },
    category: {
      type: String,
      enum: ["Accessibility", "Visual Hierarchy", "Content & Copy", "UI/UX Patterns"],
      required: true,
    },
    severity: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    recommendation: { type: String, required: true },
    roles: [
      {
        type: String,
        enum: ["Designer", "Reviewer", "Product Manager", "Developer"],
      },
    ],
    coordinates: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
