const express = require("express")
const {CreateNewCourse,deleteCourse,allCoursesForOneTeacher,allCourses} = require("../controllers/courses")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const coursesRouter = express.Router()

coursesRouter.post("/",authentication,authorization("CreateNewCourse"),CreateNewCourse)
coursesRouter.delete("/:id",authentication,authorization("deleteCourse"),deleteCourse)
coursesRouter.get("/priv",authentication,authorization("watchCourse"),allCoursesForOneTeacher)
coursesRouter.get("/",authentication,authorization("watchCourse"),allCourses)

module.exports = coursesRouter