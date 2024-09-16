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
  },
});

export const { fetchGenres, fetchGenresSuccess, fetchGenresFailure } =
  genresSlice.actions;

export default genresSlice.reducer;
