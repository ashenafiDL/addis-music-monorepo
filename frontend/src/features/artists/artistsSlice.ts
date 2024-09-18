import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Artist {
  _id: string;
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
      state.artists = state.artists.filter(
        (artist) => artist._id !== action.payload
      );
      state.loading = false;
    },
    deleteArtistFailure: (state) => {
      state.loading = false;
    },
    addArtist: (state, action: PayloadAction<Artist>) => {
      state.loading = true;
    },
    addArtistSuccess: (state, action: PayloadAction<Artist>) => {
      state.artists.push(action.payload);
      state.loading = false;
    },
    addArtistFailure: (state) => {
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
  addArtist,
  addArtistSuccess,
  addArtistFailure,
} = artistsSlice.actions;

export default artistsSlice.reducer;
