const { pool } = require("../models/db");

//! API =>  http://localhost:5000/courses {post}
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

//! API =>  http://localhost:5000/courses/:id {delete}
const deleteCourse = (req, res) => {
  const id_course_deleted = req.params.id;
  const teacher_id = req.token.user_id;

  const query = `delete from courses where id = ${id_course_deleted} and teacher_id = ${teacher_id} RETURNING *`;

  pool
    .query(query)
    .then((result) => {
      console.log(result);
      if (!result.rowCount) {
        return res.status(404).json({
          success: false,
          message: "course is not exist",
          result: result.rows,
        });
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

//! API =>  http://localhost:5000/courses/allPriv  {get}

// All private courses in this teacher
const allCoursesForOneTeacher = (req, res) => {
  const teacher_id = req.token.user_id;
  const query = `select * from courses where teacher_id=${teacher_id}`;
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "all courses for 1 teacher",
          result: result.rows,
        });
      }

      return res.status(200).json({
        success: true,
        message: "all courses for 1 teacher",
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

//! API =>  http://localhost:5000/courses/  {get}

// get all courses
const allCourses = (req, res) => {
  const query = `select * from courses`;
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "all courses for 1 teacher",
          result: result.rows,
        });
      }

      return res.status(200).json({
        success: true,
        message: "all courses for 1 teacher",
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
// ! http://localhost:5000/courses/solo/9 {get}
// 1 course solo
const getCourseById = (req, res) => {
  const Course_id = req.params.id;
  const query = `select * from courses where id = ${Course_id}`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "1 course",
        result: result.rows[0],
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
//! API http://localhost:5000/courses/:id  {put}
 const updateCourse = (req, res) => {
  const { name, description, image } = req.body;
  const Course_id = req.params.id;
  const value = [name, description, image, Course_id];
  const query = `UPDATE courses SET name=COALESCE($1,name),description=COALESCE($2,description) ,image=COALESCE($3,image) WHERE id=$4 RETURNING *;`;

  pool
    .query(query, value)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "update Successful",
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

module.exports = {
  CreateNewCourse,
  deleteCourse,
  allCoursesForOneTeacher,
  allCourses,
  getCourseById,
  updateCourse,
};
