const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
  const { username, password, email, role } = req.body;

  if (!password.replace(/^\s+|\s+$/gm, ""))
    return res.status(400).json({ message: "password cannot be empty" });

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  isValidEmail();

  if (!username)
    return res.status(400).json({ message: "Username cannot be empty" });

  if (!isValidEmail(email))
    return res.status(400).json({ message: "Invalid email" });

  const password_hash = await bcrypt.hash(password, 4);
  const UserNameNew = username.toLowerCase();
  const UserName = UserNameNew.replace(/^\s+|\s+$/gm, "");
  const Email = email.toLowerCase();

  console.log({ password, UserName, Email });


  const query = `INSERT INTO users (username,email,password_hash,role_id) VALUES ($1,$2,$3,$4) RETURNING *`;
  const value = [UserName, Email, password_hash, role];
  pool
    .query(query, value)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "created new User Successful",
        result: result.rows,
      });
    })
    .catch((err) => {
      if (err.code == 23505) {
        res.status(409).json({
          success: false,
          message: "Email or username already exists",
          error:err
        });
        return 
      }
      res.status(500).json({
        success: false,
        message: "server error",
        error: err,
      });
    });
};
module.exports = { Register };
