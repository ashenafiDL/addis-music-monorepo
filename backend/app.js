const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()
const connectDB = require("./config/db")

const albumRoutes = require("./routes/albums")
const artistRoutes = require("./routes/artists")
const genreRoutes = require("./routes/genres")
const songRoutes = require("./routes/songs")
const statRoutes = require("./routes/stats")

const app = express()
const port = process.env.PORT || 4000

// Database Connection
connectDB()

// Middleware
app.use(cors())
app.use(bodyParser.json())

app.use("/api/albums", albumRoutes)
app.use("/api/artists", artistRoutes)
app.use("/api/genres", genreRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/stats", statRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
