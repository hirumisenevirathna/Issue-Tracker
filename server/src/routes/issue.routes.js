const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const {
  createIssue,
  getMyIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} = require("../controllers/issue.controller");

// all routes protected
router.use(protect);

router.post("/", createIssue);         // Create
router.get("/", getMyIssues);          // Read all (my issues)
router.get("/:id", getIssueById);      // Read one
router.put("/:id", updateIssue);       // Update
router.delete("/:id", deleteIssue);    // Delete

module.exports = router;
