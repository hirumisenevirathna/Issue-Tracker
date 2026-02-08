const Issue = require("../models/Issue");
const mongoose = require("mongoose");

const getMyIssues = async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    // pagination defaults
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);
    const skip = (page - 1) * limit;

    // base filter: only logged-in user's issues
    const filter = { createdBy: req.user.userId };

    // optional filters
    if (status) filter.status = status;       // OPEN / IN_PROGRESS / DONE
    if (priority) filter.priority = priority; // LOW / MEDIUM / HIGH

    // optional search (title OR description)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // total count (for pagination UI)
    const total = await Issue.countDocuments(filter);

    // paginated results
    const issues = await Issue.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      issues,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

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

// ✅ GET issue status summary
const getIssueSummary = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.userId);

const summary = await Issue.aggregate([
  { $match: { createdBy: userObjectId } },
  { $group: { _id: "$status", count: { $sum: 1 } } },
]);

    // default counts
    const result = {
      OPEN: 0,
      IN_PROGRESS: 0,
      DONE: 0,
    };

    summary.forEach((item) => {
      result[item._id] = item.count;
    });

    return res.status(200).json(result);
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
  getIssueSummary,
};
