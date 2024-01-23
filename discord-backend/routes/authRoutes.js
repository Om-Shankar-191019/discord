const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const auth = require("../middleware/auth");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().min(2).max(16).required(),
  password: Joi.string().min(6).max(16).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(16),
  mail: Joi.string().email(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

router.get("/test", auth, (req, res) => {
  res.send("testing verifytoken");
});
module.exports = router;
