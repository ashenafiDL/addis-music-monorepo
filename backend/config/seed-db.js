#! /usr/bin/env node

const mongoose = require("mongoose")
const connectDB = require("./db")

const Song = require("../models/song")
const Artist = require("../models/artist")
const Album = require("../models/album")
const Genre = require("../models/genre")

const genres = []
const artists = []
const albums = []
const songs = []

mongoose.set("strictQuery", true)

main().catch((err) => console.log(err))

async function main() {
  console.log("Debug: About to connect")
  connectDB()
  console.log("Debug: Should be connected?")
  await createGenres()
  await createArtists()
  await createAlbums()
  await createSongs()
  console.log("Debug: Closing mongoose")
  mongoose.connection.close()
}

async function genreCreate(index, name, description) {
  const genre = new Genre({ name: name, description: description })
  await genre.save()
  genres[index] = genre
  console.log(`Added genre: ${name}`)
}

async function createGenres() {
  console.log("Adding genres")
  await Promise.all([
    genreCreate(
      0,
      "Rock",
      "A genre of popular music that originated as 'rock and roll' in the United States in the late 1940s and early 1950s."
    ),
    genreCreate(
      1,
      "Pop",
      "A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom."
    ),
    genreCreate(
      2,
      "Jazz",
      "A genre of music that originated in the African-American communities of New Orleans, United States."
    ),
  ])
}

async function artistCreate(index, name, bio, genres) {
  const artist = new Artist({ name: name, bio: bio, genres: genres })
  await artist.save()
  artists[index] = artist
  console.log(`Added artist: ${name}`)
}

async function createArtists() {
  console.log("Adding artists")
  await Promise.all([
    artistCreate(
      0,
      "The Beatles",
      "An English rock band formed in Liverpool in 1960.",
      [genres[0], genres[1]]
    ),
    artistCreate(
      1,
      "Miles Davis",
      "An American trumpeter, bandleader, and composer.",
      [genres[2]]
    ),
    artistCreate(
      2,
      "Taylor Swift",
      "An American singer-songwriter known for narrative songs about her personal life.",
      [genres[1]]
    ),
  ])
}

async function albumCreate(index, title, artist, releaseDate, genres) {
  const album = new Album({
    title: title,
    artist: artist,
    releaseDate: releaseDate,
    genres: genres,
  })
  await album.save()
  albums[index] = album
  console.log(`Added album: ${title}`)
}

async function createAlbums() {
  console.log("Adding albums")
  await Promise.all([
    albumCreate(0, "Abbey Road", artists[0], "1969-09-26", [genres[0]]),
    albumCreate(1, "Kind of Blue", artists[1], "1959-08-17", [genres[2]]),
    albumCreate(2, "1989", artists[2], "2014-10-27", [genres[1]]),
  ])
}

async function songCreate(
  index,
  title,
  artist,
  album,
  duration,
  genres,
  releaseDate
) {
  const song = new Song({
    title: title,
    artist: artist,
    album: album,
    duration: duration,
    genres: genres,
    releaseDate: releaseDate,
  })
  await song.save()
  songs[index] = song
  console.log(`Added song: ${title}`)
}

async function createSongs() {
  console.log("Adding songs")
  await Promise.all([
    songCreate(
      0,
      "Come Together",
      artists[0],
      albums[0],
      259,
      [genres[0]],
      "1969-09-26"
    ),
    songCreate(
      1,
      "So What",
      artists[1],
      albums[1],
      564,
      [genres[2]],
      "1959-08-17"
    ),
    songCreate(
      2,
      "Shake It Off",
      artists[2],
      albums[2],
      242,
      [genres[1]],
      "2014-08-18"
    ),
  ])
}
