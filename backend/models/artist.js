const mongoose = require("mongoose")

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
})

const Artist = mongoose.model("Artist", artistSchema)

module.exports = Artist
