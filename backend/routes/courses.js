const express = require("express")
const {CreateNewCourse,deleteCourse,allCoursesForOneTeacher,allCourses,getCourseById,updateCourse} = require("../controllers/courses")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const coursesRouter = express.Router()

coursesRouter.post("/",authentication,authorization("CreateNewCourse"),CreateNewCourse)
coursesRouter.delete("/:id",authentication,authorization("deleteCourse"),deleteCourse)
coursesRouter.get("/allPriv",authentication,authorization("watchCourse"),allCoursesForOneTeacher)
coursesRouter.get("/",authentication,authorization("watchCourse"),allCourses)
coursesRouter.get("/solo/:id",authentication,authorization("watchCourse"),getCourseById)
coursesRouter.put("/:id",authentication,authorization("updateCourse"),updateCourse)

module.exports = coursesRouter