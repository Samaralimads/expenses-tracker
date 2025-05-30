const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = 12;
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

// POST /api/auth/signup
// Register a new user
router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please input all the required fields." });
    }
    const userAlreadyExist = await User.findOne({ email: email });

    if (userAlreadyExist) {
      return res.status(400).json({ message: "This email is already in use." });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(createdUser);
    return res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
// Authenticate user & get token
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password }); // Log do que recebeu

    if (!email || !password) {
      console.log("Faltando email ou senha");
      return res
        .status(400)
        .json({ message: "Please input all the required fields." });
    }

    const existingUser = await User.findOne({ email }).select(
      "password username email"
    );
    console.log("Usuário encontrado no banco:", existingUser);

    if (!existingUser) {
      console.log("Usuário não encontrado");
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const matchingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log("Senha bate?", matchingPassword);

    if (!matchingPassword) {
      console.log("Senha incorreta");
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign(
      { _id: existingUser._id },
      process.env.TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "7d",
      }
    );
    console.log("Login OK, token criado");

    res.json({ authToken: token });
  } catch (err) {
    console.error("Erro na rota login:", err);
    next(err);
  }
});

// GET /api/auth/user
// Get user data
router.get("/verify", authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;
