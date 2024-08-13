const mongoose = require("mongoose")
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
}

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, clientOptions)
    await mongoose.connection.db.admin().command({ ping: 1 })
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    )
  } catch (error) {
    console.error(error)
  }
}

module.exports = connectDB
