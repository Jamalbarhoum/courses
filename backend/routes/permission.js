const express = require("express")
const {createNewPermission,allPermission} =require("../controllers/permissions")
const PermissionRouter= express.Router()

PermissionRouter.post("/",createNewPermission)
PermissionRouter.get("/",allPermission)

module.exports = PermissionRouter