import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Album {
  id: number;
  title: string;
  artist: string;
  releaseDate: number;
  genres: string;
}

interface AlbumState {
  albums: Album[];
  loading: boolean;
}

const initialState: AlbumState = {
  albums: [],
  loading: false,
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    fetchAlbums: (state) => {
      state.loading = true;
    },
    fetchAlbumsSuccess: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
      state.loading = false;
    },
    fetchAlbumsFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchAlbums, fetchAlbumsSuccess, fetchAlbumsFailure } =
  albumsSlice.actions;

export default albumsSlice.reducer;
