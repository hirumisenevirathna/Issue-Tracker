const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
const { protect } = require("../middlewares/auth.middleware");

router.get("/me", protect, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});


module.exports = router;
