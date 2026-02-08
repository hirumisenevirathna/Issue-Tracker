const Issue = require("../models/Issue");

// ✅ CREATE issue
const createIssue = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const issue = await Issue.create({
      title,
      description,
      status,
      priority,
      createdBy: req.user.userId, // from JWT middleware
    });

    return res.status(201).json({ message: "Issue created", issue });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET all issues for logged-in user
const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.user.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ issues });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET single issue (only if owner)
const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    return res.status(200).json({ issue });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ UPDATE issue (only if owner)
const updateIssue = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    const issue = await Issue.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (title !== undefined) issue.title = title;
    if (description !== undefined) issue.description = description;
    if (status !== undefined) issue.status = status;
    if (priority !== undefined) issue.priority = priority;

    await issue.save();

    return res.status(200).json({ message: "Issue updated", issue });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE issue (only if owner)
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    await issue.deleteOne();

    return res.status(200).json({ message: "Issue deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createIssue,
  getMyIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};
