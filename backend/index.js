const express = require("express");
const cors = require("cors");
require("dotenv").config()
require("./models/db")
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(cors());


const RouterRole = require("./routes/roles")
const PermissionRouter = require("./routes/permission")
const RolePermissionRouter = require("./routes/role_permission")
const UserRouter = require("./routes/user")
const coursesRouter = require("./routes/courses")

app.use("/role",RouterRole)
app.use("/Permission",PermissionRouter)
app.use("/RolePermissionRouter",RolePermissionRouter)
app.use("/user",UserRouter)
app.use("/courses",coursesRouter)




app.use("*", (req, res) => res.status(404).json("NO content at this path"));


app.listen(PORT, () => {

  console.log(`Server Listening at http://localhost:${PORT}`);

});
