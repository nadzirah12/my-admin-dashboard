const express = require("express");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const { getProfile } = require("../controllers/user.controller");

const router = express.Router();

router.get(
  "/profile",
  authenticate,
  getProfile
);

router.get(
  "/admin",
  authenticate,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Admin access granted",
    });
  }
);

module.exports = router;