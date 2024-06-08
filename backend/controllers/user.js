const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  const { username, password, email, role } = req.body;

  if(!username|| !password  ||  !email || !role ){
    return res.status(400).json({ message: "cannot be empty" });
  }

  if (!password.replace(/^\s+|\s+$/gm, ""))
    return res.status(400).json({ message: "password cannot be empty" });
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "password It must be six characters or more" });
  }
  const password_hash = await bcrypt.hash(password, 4);
  const UserNameNew = username?.toLowerCase();
  const UserName = UserNameNew?.replace(/^\s+|\s+$/gm, "");
  const Email = email?.toLowerCase();

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  isValidEmail();

  if (!UserName)
    return res.status(400).json({ message: "Username cannot be empty" });

  if (!isValidEmail(email))
    return res.status(400).json({ message: "Invalid email" });

  console.log({ password, UserName, Email });

  const query = `INSERT INTO users (username,email,password_hash,role_id) VALUES ($1,$2,$3,$4) RETURNING *`;
  const value = [UserName, Email, password_hash, role];
  pool
    .query(query, value)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "created Successful",
        result: result.rows,
      });
    })
    .catch((err) => {
      if (err.code == 23505) {
        res.status(409).json({
          success: false,
          message: "Email or username already exists",
          error: err,
        });
        return;
      }
      res.status(500).json({
        success: false,
        message: "server error",
        error: err,
      });
    });
};

const login = async (req, res) => {
  const { password, email } = req.body;

  const Email = email?.toLowerCase();

  const query = `SELECT * from users where email='${Email}'`;

  pool
    .query(query)
    .then(async (result) => {
      const data_user = result.rows[0];
      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "email or password unavailable" });
      }

      try {
        const Compar_password = await bcrypt.compare(
          password + "",
          data_user.password_hash
        );
        if (!Compar_password) {
          return res
            .status(404)
            .json({ message: "password or email unavailable" });
        }
      } catch (err) {
        return res.status(409).json({
          message: "unavailable",
        });
      }

      const payload = {
        user_id: data_user.user_id,
        name: data_user.username,
        role: data_user.role_id,
      };
      console.log(payload);
      const Secret = process.env.Secret;
      const options = { expiresIn: "360m" };

      const token = jwt.sign(payload, Secret, options);
      return res.status(200).json({
        success: true,
        massage: "Valid login credentials",
        token: token,
        role: data_user.role_id
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "server error",
        error: err,
      });
    });
};

module.exports = { Register, login };
