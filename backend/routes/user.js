const express =  require("express")

const {Register}= require("../controllers/user")

const UserRouter = express.Router()

UserRouter.post("/",Register)
module.exports = UserRouter