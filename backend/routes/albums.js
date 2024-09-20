const express = require("express")
const Album = require("../models/album")
// eslint-disable-next-line no-unused-vars
const Artist = require("../models/artist")
// eslint-disable-next-line no-unused-vars
const Genre = require("../models/genre") // Importing the Genre/Artist model is required to populate the album's artist and genres

const router = express.Router()

// Create a new album
router.post("/", async (req, res) => {
  try {
    const album = new Album(req.body)
    await album.save()
    const newAlbum = await Album.findOne(album._id)
      .populate("artist", "name")
      .populate("genres", "name")
    res.status(201).json(newAlbum)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all albums
router.get("/", async (req, res) => {
  try {
    const albums = await Album.find()
      .populate("artist", "name")
      .populate("genres", "name")
    res.status(200).json(albums)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get an album by ID
router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id)
      .populate("artist", "name")
      .populate("genres", "name")
    if (!album) return res.status(404).json({ message: "Album not found" })
    res.status(200).json(album)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update an album by ID
router.patch("/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    const updatedAlbum = await Album.findOne(album._id)
      .populate("artist", "name")
      .populate("genres", "name")
    if (!updatedAlbum)
      return res.status(404).json({ message: "Album not found" })
    else
      res
        .status(200)
        .json({ message: "Album updated successfully", updatedAlbum })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete an album by ID
router.delete("/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id)
    if (!album) return res.status(404).json({ message: "Album not found" })
    res.status(200).json({ message: "Album deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
