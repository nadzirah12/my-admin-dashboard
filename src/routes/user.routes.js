const express = require("express");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
} = require("../controllers/user.controller");

const router = express.Router();

/**
 * GET /users/profile
 * Get user profile based on user data from token
 * @returns {object} - The user profile
 */
router.get(
  "/profile",
  authenticate,
  getProfile
);

/**
 * Admin only routes
 */

router.get(
  "/",
  authenticate,
  authorize("admin"),
  getUsers
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  createUser
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteUser
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