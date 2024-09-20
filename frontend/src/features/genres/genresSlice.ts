import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Genre {
  _id: string;
  name: string;
  description: string;
}

interface SongsState {
  genres: Genre[];
  loading: boolean;
}

const initialState: SongsState = {
  genres: [],
  loading: false,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    fetchGenres: (state) => {
      state.loading = true;
    },
    fetchGenresSuccess: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
      state.loading = false;
    },
    fetchGenresFailure: (state) => {
      state.loading = false;
    },
    deleteGenre: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteGenreSuccess: (state, action: PayloadAction<string>) => {
      state.genres = state.genres.filter(
        (genre) => genre._id !== action.payload
      );
      state.loading = false;
    },
    deleteGenreFailure: (state) => {
      state.loading = false;
    },
    addGenre: (state, action: PayloadAction<Genre>) => {
      state.loading = true;
    },
    addGenreSuccess: (state, action: PayloadAction<Genre>) => {
      state.genres.push(action.payload);
      state.loading = false;
    },
    addGenreFailure: (state) => {
      state.loading = false;
    },
    updateGenre: (state, action: PayloadAction<Genre>) => {
      state.loading = true;
    },
    updateGenreSuccess: (state, action: PayloadAction<Genre>) => {
      const index = state.genres.findIndex(
        (genre) => genre._id === action.payload._id
      );
      if (index !== -1) {
        state.genres[index] = action.payload;
      }
      state.loading = false;
    },
    updateGenreFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchGenres,
  fetchGenresSuccess,
  fetchGenresFailure,
  deleteGenre,
  deleteGenreSuccess,
  deleteGenreFailure,
  addGenre,
  addGenreSuccess,
  addGenreFailure,
  updateGenre,
  updateGenreSuccess,
  updateGenreFailure,
} = genresSlice.actions;

export default genresSlice.reducer;
