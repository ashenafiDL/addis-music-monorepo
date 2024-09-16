import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Artist {
  id: number;
  name: string;
  bio: string;
}

interface SongsState {
  artists: Artist[];
  loading: boolean;
}

const initialState: SongsState = {
  artists: [],
  loading: false,
};

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    fetchArtists: (state) => {
      state.loading = true;
    },
    fetchArtistsSuccess: (state, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
      state.loading = false;
    },
    fetchArtistsFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchArtists, fetchArtistsSuccess, fetchArtistsFailure } =
  artistsSlice.actions;

export default artistsSlice.reducer;
