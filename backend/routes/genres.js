const express = require("express")
const Genre = require("../models/genre")

const router = express.Router()

// Create a new genre
router.post("/", async (req, res) => {
  try {
    const genre = new Genre(req.body)
    await genre.save()
    res.status(201).json(genre)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all genres
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find()
    res.status(200).json(genres)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a genre by ID
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(404).json({ message: "Genre not found" })
    res.status(200).json(genre)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update a genre by ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    if (!updatedGenre)
      return res.status(404).json({ message: "Genre not found" })
    res
      .status(200)
      .json({ message: "Genre updated successfully", updatedGenre })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete a genre by ID
router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if (!genre) return res.status(404).json({ message: "Genre not found" })
    res.status(200).json({ message: "Genre deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
