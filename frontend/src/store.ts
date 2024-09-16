import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { albumSaga } from "./features/albums/albumsSaga";
import albumsReducer from "./features/albums/albumsSlice";
import { artistsSaga } from "./features/artists/artistsSaga";
import artistsReducer from "./features/artists/artistsSlice";
import { genresSaga } from "./features/genres/genresSaga";
import genresReducer from "./features/genres/genresSlice";
import { songsSaga } from "./features/songs/songsSaga";
import songsReducer from "./features/songs/songsSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songsReducer,
    genres: genresReducer,
    artists: artistsReducer,
    albums: albumsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(songsSaga);
sagaMiddleware.run(genresSaga);
sagaMiddleware.run(artistsSaga);
sagaMiddleware.run(albumSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
