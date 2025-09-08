const sendResponse = require("../utils/responseUtils");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { imageSizeFromFile } = require("image-size/fromFile");
const ScreenModal = require("../models/screenModel");

exports.read = asyncErrorHandler(async (req, res) => {
  const projectId = req.params.project;

  const screens = await ScreenModal.find({ project_id: projectId });

  return sendResponse(res, "Screens retrived successfully", screens);
});

exports.uploadScreen = asyncErrorHandler(async (req, res) => {
  const files = req.files;
  const projectId = req.body.project_id;

  const screens = [];

  for (let file of files) {
    const dimensions = await imageSizeFromFile(file.path);
    let filePath = file.path.replace("public\\", "");
    filePath = filePath.replace("\\", "/");
    file.path = filePath;
    screens.push({
      project_id: projectId,
      path: file.path,
      meta_data: {
        mime_type: file.mimetype,
        size: file.size,
        width: dimensions.width,
        height: dimensions.height,
      },
    });
  }

  const createdScreens = await ScreenModal.create(screens);

  return sendResponse(res, "Screens created successfully", createdScreens);
});
