const sendResponse = require("../utils/responseUtils");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CommentModel = require("../models/commentModel");

exports.create = asyncErrorHandler(async (req, res) => {
  const input = req.body;

  const comment = await CommentModel.create(input);

  return sendResponse(res, "Comment created successfully", comment);
});

exports.read = asyncErrorHandler(async (req, res) => {
  const screenId = req.params.screen;

  const comments = await CommentModel.find({ screen_id: screenId }).lean();

  const tree = buildCommentTree(comments);

  return sendResponse(res, "Comments retrived successfully", tree);
});

exports.edit = asyncErrorHandler(async (req, res) => {
  const commentId = req.params.comment;
  const comment = await CommentModel.findOne({ _id: commentId });

  return sendResponse(res, "Comment retrived successfully", comment);
});

exports.update = asyncErrorHandler(async (req, res) => {
  const { comment_id, ...updateData } = req.body;

  const comment = await CommentModel.updateOne({ _id: comment_id }, { $set: updateData });

  return sendResponse(res, "Comment updated successfully", comment);
});

exports.delete = asyncErrorHandler(async (req, res) => {
  const commentId = req.body.comment_id;  

  const comment = await CommentModel.updateOne({ _id: commentId }, { $set: { message: "deleted", is_deleted: 1 } });

  return sendResponse(res, "Comment updated successfully", comment);
});

function buildCommentTree(list, parent = null) {
  return list
    .filter((c) => String(c.parent_id) === String(parent))
    .map((c) => ({
      ...c,
      replies: buildCommentTree(list, c._id),
    }));
}
