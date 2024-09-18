import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Album {
  _id: string;
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
    deleteAlbum: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteAlbumSuccess: (state, action: PayloadAction<string>) => {
      state.albums = state.albums.filter(
        (album) => album._id !== action.payload
      );
      state.loading = false;
    },
    deleteAlbumFailure: (state) => {
      state.loading = false;
    },
    addAlbum: (state, action: PayloadAction<Album>) => {
      state.loading = true;
    },
    addAlbumSuccess: (state, action: PayloadAction<Album>) => {
      state.albums.push(action.payload);
      state.loading = false;
    },
    addAlbumFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchAlbums,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,
  deleteAlbum,
  deleteAlbumSuccess,
  deleteAlbumFailure,
  addAlbum,
  addAlbumSuccess,
  addAlbumFailure,
} = albumsSlice.actions;

export default albumsSlice.reducer;
