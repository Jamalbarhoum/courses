const { pool } = require("../models/db");

const createNewPermission = (req, res) => {
  const { Permission } = req.body;
  const query = `INSERT INTO Permissions (permission) VALUES ('${Permission}') RETURNING *`;
  pool
    .query(query)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Created New permission",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "failed created",
        err: err,
      });
    });
};
const allPermission = (req, res) => {
  const query = `SELECT * FROM Permissions`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message:"All Permission",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success:false,
        message:"Server error",
        err:err
      });
    });
};
module.exports = { createNewPermission,allPermission };
