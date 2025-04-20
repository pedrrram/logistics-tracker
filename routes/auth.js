const express = require("express");
const {
  registerSchema,
  loginSchema,
  validate,
} = require("../http/validators/authValidator");
const {
  register,
  login,
  logout,
} = require("../http/controllers/authController");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

module.exports = router;
