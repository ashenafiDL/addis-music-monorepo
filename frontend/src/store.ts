import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import { songsSaga } from "./features/songs/songsSaga"
import songsReducer from "./features/songs/songsSlice"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    songs: songsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(songsSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
