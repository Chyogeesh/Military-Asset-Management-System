const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
