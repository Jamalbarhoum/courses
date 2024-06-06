const express = require("express");
const cors = require("cors");
require("dotenv").config()
require("./models/db")
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(cors());


const RouterRole = require("./routes/roles")

app.use("/role",RouterRole)


app.listen(PORT, () => {

  console.log(`Server Listening at http://localhost:${PORT}`);

});
