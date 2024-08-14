import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Song {
  id: number
  title: string
  artist: string
  album: string
  genre: string
  releaseDate: number
}

interface SongsState {
  songs: Song[]
  loading: boolean
}

const initialState: SongsState = {
  songs: [],
  loading: false,
}

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs: (state) => {
      state.loading = true
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload
      state.loading = false
    },
    fetchSongsFailure: (state) => {
      state.loading = false
    },
  },
})

export const { fetchSongs, fetchSongsSuccess, fetchSongsFailure } =
  songsSlice.actions

export default songsSlice.reducer
