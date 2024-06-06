const express = require("express")
const {createNewPermission,allPermission} =require("../controllers/permissions")
const PermissionRouter= express.Router()

PermissionRouter.post("/",createNewPermission)
PermissionRouter.get("/",allPermission)


/*
{
    "success": true,
    "message": "All Permission",
    "result": [
        {
            "id": 1,
            "permission": "CreateNewCourse"
        },
        {
            "id": 2,
            "permission": "deleteCourse"
        },
        {
            "id": 3,
            "permission": "updateCourse"
        },
        {
            "id": 4,
            "permission": "watchCourse"
        }
    ]
}

*/
module.exports = PermissionRouter