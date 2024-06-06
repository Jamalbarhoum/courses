const express = require("express")
const {createNewRole,deleteRole,allRoles} =require("../controllers/role")
const RouterRole = express.Router()

RouterRole.post("/",createNewRole)
RouterRole.delete("/",deleteRole)
RouterRole.get("/",allRoles)


module.exports = RouterRole