const { pool } = require("../models/db");
const authorization = (string) => {
  return (req, res, next) => {

    const id_role = req.token.role;

    pool
      .query(
        `SELECT *
FROM role_permission
JOIN Permissions ON Permissions.id = role_permission.permission_id
where Permissions.permission = '${string}' and role_id = ${id_role}`
      )
      .then((result) => {
        if (result.rows.length) {
          next();
        } else {
          throw Error;
        }
      })
      .catch((err) => {
        res.status(400).json({ message: "unauthorized" });
      });
  };
};

module.exports = authorization;
