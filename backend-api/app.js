require("dotenv").config({quiet: true})
const express = require("express");

const app = express();

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
