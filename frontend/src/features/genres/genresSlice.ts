import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Genre {
  id: number;
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
      state.loading = false;
    },
    deleteGenreFailure: (state) => {
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
} = genresSlice.actions;

export default genresSlice.reducer;
