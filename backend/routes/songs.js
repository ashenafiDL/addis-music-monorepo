const express = require("express")
const Song = require("../models/song")
const Artist = require("../models/artist")
const Genre = require("../models/genre")
const Album = require("../models/album")

const router = express.Router()

// Create a new song
router.post("/", async (req, res) => {
  try {
    const { title, artistId, albumId, releaseDate, genreIds } = req.body

    // Validate artist and genres exist
    const artist = await Artist.findById(artistId)
    const genres = await Genre.find({ _id: { $in: genreIds } })
    const album = await Album.findById(albumId)

    if (!artist) return res.status(404).json({ message: "Artist not found" })
    if (genres.length !== genreIds.length)
      return res.status(404).json({ message: "Some genres not found" })
    if (!album) return res.status(404).json({ message: "Album not found" })

    const song = new Song({
      title,
      artist: artist._id,
      album: album._id,
      releaseDate,
      genres: genreIds,
    })

    await song.save()
    res.status(201).json(song)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("artist", "name")
      .populate("genres", "name")
      .populate("album", "title")
    res.status(200).json(songs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a song by ID
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate("artist", "name")
      .populate("genres", "name")
      .populate("album", "title")
    if (!song) return res.status(404).json({ message: "Song not found" })
    res.status(200).json(song)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update a song by ID
router.patch("/:id", async (req, res) => {
  try {
    const { artistId, genreIds, albumId } = req.body

    if (artistId) {
      const artist = await Artist.findById(artistId)
      if (!artist) return res.status(404).json({ message: "Artist not found" })
      req.body.artist = artist._id
    }

    if (genreIds) {
      const genres = await Genre.find({ _id: { $in: genreIds } })
      if (genres.length !== genreIds.length)
        return res.status(404).json({ message: "Some genres not found" })
      req.body.genres = genreIds
    }

    if (albumId) {
      const album = await Album.findById(albumId)
      if (!album) return res.status(404).json({ message: "Album not found" })
      req.body.album = album._id
    }

    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("artist", "name")
      .populate("genres", "name")
      .populate("album", "title")
    if (!song) return res.status(404).json({ message: "Song not found" })
    res.status(200).json({ message: "Song updated successfully", song })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete a song by ID
router.delete("/:id", async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id)
    if (!song) return res.status(404).json({ message: "Song not found" })
    res.status(200).json({ message: "Song deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
