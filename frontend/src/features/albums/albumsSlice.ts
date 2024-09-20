import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Album {
  _id: string;
  title: string;
  artist: string;
  releaseDate: number;
  genres: [];
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
    updateAlbum: (state, action: PayloadAction<Album>) => {
      state.loading = true;
    },
    updateAlbumSuccess: (state, action: PayloadAction<any>) => {
      const index = state.albums.findIndex(
        (album) => album._id === action.payload._id
      );
      console.log(action.payload, "ppp");

      if (index !== -1) {
        state.albums[index] = action.payload;
      }
      state.loading = false;
    },
    updateAlbumFailure: (state) => {
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
  updateAlbum,
  updateAlbumSuccess,
  updateAlbumFailure,
} = albumsSlice.actions;

export default albumsSlice.reducer;
