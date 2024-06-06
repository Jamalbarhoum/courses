const express = require("express");
const cors = require("cors");
require("dotenv").config()

const PORT = 5000;
const app = express();

app.use(express.json())
app.use(cors());




app.listen(PORT, () => {
  console.log(`Server Listening at http://localhost:${PORT}`);
});
