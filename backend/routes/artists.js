const express = require("express")
const Artist = require("../models/artist")

const router = express.Router()

// Create a new artist
router.post("/", async (req, res) => {
  try {
    const artist = new Artist(req.body)
    await await artist.save()
    res.status(201).json(artist)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all artists
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find()
    res.status(200).json(artists)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get an artist by ID
router.get("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id)
    if (!artist) return res.status(404).json({ message: "Artist not found" })
    res.status(200).json(artist)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update an artist by ID
router.patch("/:id", async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!artist) return res.status(404).json({ message: "Artist not found" })
    res.status(200).json({ message: "Artist updated successfully", artist })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete an artist by ID
router.delete("/:id", async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id)
    if (!artist) return res.status(404).json({ message: "Artist not found" })
    res.status(200).json({ message: "Artist deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
