const express = require("express")
const {CreateNewCourse,deleteCourse} = require("../controllers/courses")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const coursesRouter = express.Router()

coursesRouter.post("/",authentication,authorization("CreateNewCourse"),CreateNewCourse)
coursesRouter.delete("/:id",authentication,authorization("CreateNewCourse"),deleteCourse)

module.exports = coursesRouter