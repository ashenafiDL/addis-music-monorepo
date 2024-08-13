const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()
const connectDB = require("./config/db")

const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Database Connection
connectDB()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
