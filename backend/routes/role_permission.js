const express= require("express")
const {CreateRolePermission,allRolePermission} = require("../controllers/role_permission")
const RolePermissionRouter = express.Router()


RolePermissionRouter.post("/",CreateRolePermission)
RolePermissionRouter.get("/",allRolePermission)



module.exports = RolePermissionRouter