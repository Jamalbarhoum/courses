const express =  require("express")

const {Register,login}= require("../controllers/user")

const UserRouter = express.Router()

UserRouter.post("/Register",Register)
UserRouter.post("/login",login)
module.exports = UserRouter