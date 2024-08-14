const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
  },
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  releaseDate: {
    type: Date,
    required: true,
  },
})

const Song = mongoose.model("Song", songSchema)

module.exports = Song
