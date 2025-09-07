const sendResponse = require("../utils/responseUtils");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const ProjectModel = require("../models/projectModel");

exports.create = asyncErrorHandler(async (req, res) => {
  const input = req.body;

  const project = await ProjectModel.create(input);

  return sendResponse(res, "Project created successfully", project);
});

exports.read = asyncErrorHandler(async (req, res) => {
  const projects = await ProjectModel.find({});

  return sendResponse(res, "Project retrived successfully", projects);
});
