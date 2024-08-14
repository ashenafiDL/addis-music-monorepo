const express = require("express")
const Song = require("../models/song")
const Artist = require("../models/artist")
const Album = require("../models/album")
const Genre = require("../models/genre")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    // Total count of songs, artists, albums, and genres
    const totalSongs = await Song.countDocuments()
    const totalArtists = await Artist.countDocuments()
    const totalAlbums = await Album.countDocuments()
    const totalGenres = await Genre.countDocuments()

    // Number of songs in each genre
    const songsPerGenre = await Song.aggregate([
      { $unwind: "$genres" },
      {
        $group: {
          _id: "$genres",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "_id",
          foreignField: "_id",
          as: "genre",
        },
      },
      {
        $unwind: "$genre",
      },
      {
        $project: {
          _id: 0,
          genre: "$genre.name",
          count: 1,
        },
      },
    ])

    // Number of songs & albums each artist has
    const songsPerArtist = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          songCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "artists",
          localField: "_id",
          foreignField: "_id",
          as: "artist",
        },
      },
      {
        $unwind: "$artist",
      },
      {
        $project: {
          _id: 0,
          artist: "$artist.name",
          songCount: 1,
        },
      },
    ])

    const albumsPerArtist = await Album.aggregate([
      {
        $group: {
          _id: "$artist",
          albumCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "artists",
          localField: "_id",
          foreignField: "_id",
          as: "artist",
        },
      },
      {
        $unwind: "$artist",
      },
      {
        $project: {
          _id: 0,
          artist: "$artist.name",
          albumCount: 1,
        },
      },
    ])

    // Number of songs in each album
    const songsPerAlbum = await Song.aggregate([
      {
        $group: {
          _id: "$album",
          songCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "albums",
          localField: "_id",
          foreignField: "_id",
          as: "album",
        },
      },
      {
        $unwind: "$album",
      },
      {
        $project: {
          _id: 0,
          album: "$album.title",
          songCount: 1,
        },
      },
    ])

    res.status(200).json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsPerGenre,
      songsPerArtist,
      albumsPerArtist,
      songsPerAlbum,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
