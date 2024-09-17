import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Artist {
  id: string;
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
    deleteArtist: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteArtistSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
    },
    deleteArtistFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchArtists,
  fetchArtistsSuccess,
  fetchArtistsFailure,
  deleteArtist,
  deleteArtistSuccess,
  deleteArtistFailure,
} = artistsSlice.actions;

export default artistsSlice.reducer;
