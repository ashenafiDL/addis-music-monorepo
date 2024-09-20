import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  releaseDate: number;
}

interface SongsState {
  songs: Song[];
  loading: boolean;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs: (state) => {
      state.loading = true;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure: (state) => {
      state.loading = false;
    },
    deleteSong: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure: (state) => {
      state.loading = false;
    },
    addSong: (state) => {
      state.loading = true;
    },
    addSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
      state.loading = false;
    },
    addSongFailure: (state) => {
      state.loading = false;
    },
    updateSong: (state, action: PayloadAction<Song>) => {
      state.loading = true;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.loading = false;
    },
    updateSongFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
  addSong,
  addSongSuccess,
  addSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
