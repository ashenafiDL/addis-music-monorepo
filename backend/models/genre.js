const mongoose = require("mongoose")

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 250,
  },
})

const Genre = mongoose.model("Genre", genreSchema)

module.exports = Genre
