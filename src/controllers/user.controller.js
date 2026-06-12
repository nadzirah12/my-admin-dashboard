const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// get user profile based on user data from token
const getProfile = async (req, res) => {
  res.json({
    message: "Profile fetched",
    user: req.user,
  });
};

/**
 * GET /users
 * Get all users from Database
 */
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * POST /users
 * Create a new user
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @param {string} role - The role of the user
 * @returns {object} - The created user
 */
const createUser = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // if role is not provided, set it to user
    if (!role) {
      role = "user";
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Attach the plain password to the user object before responding
    const userWithPlainPassword = { 
      ...user, 
      password: password // returns the original plain password, not the hashed one 
    };

    res.status(201).json({ message: "User created successfully", user: userWithPlainPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /users/:id
 * Update a user
 * @param {string} id - The id of the user
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} role - The role of the user
 * @returns {object} - The updated user
 */
const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { name, email, role } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
      },
    });

    // remove password from user object
    const { password, ...safeUser } = user;
    res.status(200).json(safeUser);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * DELETE /users/:id
 * Delete a user
 * If admin try to delete another user, delete the user
 * @param {string} id - The id of the user
 * @returns {object} - The deleted user
 */
const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const currentUserId = req.user.id;

    if (currentUserId === id) {
      return res.status(403).json({ message: "You cannot delete yourself!!" });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getProfile
};