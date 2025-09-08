const sendResponse = require("../utils/responseUtils");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const FeedbackModel = require("../models/feedbackModel");
const ScreenModel = require("../models/screenModel");
const dotenv = require("dotenv");
dotenv.config();
const vision = require("@google-cloud/vision");
const visionClient = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_CLOUD_VISION_KEY,
});

exports.getFeedback = asyncErrorHandler(async (req, res) => {
  const screenId = req.params.screen;

  const screen = await ScreenModel.findOne({ _id: screenId });
  const imagePath = screen.path;

  const [objResult] = await visionClient.objectLocalization({
    image: { source: { filename: imagePath } },
  });

  const objects = objResult.localizedObjectAnnotations || [];

  const [textResult] = await visionClient.textDetection({
    image: { source: { filename: imagePath } },
  });

  const texts = textResult.textAnnotations || [];

  console.log("Objects", objects);
  console.log("Text", texts);

  return sendResponse(res, "Feedback retrived successfully", input);
});
