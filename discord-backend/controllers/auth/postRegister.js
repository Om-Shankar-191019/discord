const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;
    const userExist = await User.exists({ mail: mail.toLowerCase() });
    if (userExist) return res.status(409).send("E-mail already in use.");
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(409).send("Error occured. Please try again");
  }
};

module.exports = postRegister;
