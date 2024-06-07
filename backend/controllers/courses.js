const { pool } = require("../models/db");

const CreateNewCourse = (req, res) => {
  const { name, description, image } = req.body;
  const teacher_id = req.token.user_id;
  const values = [name, description, image, teacher_id];
  
  const query = `INSERT INTO courses (name,description,image,teacher_id) VALUES ($1,$2,$3,$4) RETURNING *`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Create new course Successful",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err,
      });
    });
};
const deleteCourse = (req, res) => {

  const id_course_deleted = req.params.id;
  const teacher_id = req.token.user_id;

  const query = `delete from courses where id = ${id_course_deleted} and teacher_id = ${teacher_id} RETURNING *`;

  pool
    .query(query)
    .then((result) => {
        console.log(result);
        if(!result.rowCount){
            return res.status(404).json({
                success:false,
                message:"course is not exist",
                result:result.rows
            })
        }
      return res.status(201).json({
        success: true,
        message: "course deleted successful",
        result: result.rows,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "server error",
        error: err,
      });
    });
};

module.exports = { CreateNewCourse, deleteCourse };
