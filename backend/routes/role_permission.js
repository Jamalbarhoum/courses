const express= require("express")
const {CreateRolePermission,allRolePermission} = require("../controllers/role_permission")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const RolePermissionRouter = express.Router()


RolePermissionRouter.post("/",CreateRolePermission)
RolePermissionRouter.get("/",authentication,authorization("CreateNewCourse"),allRolePermission)



module.exports = RolePermissionRouter