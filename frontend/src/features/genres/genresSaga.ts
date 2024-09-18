import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { addGenreApi, deleteGenreApi, getGenres } from "../../api/genresApi";
import {
  addGenre,
  addGenreFailure,
  addGenreSuccess,
  deleteGenre,
  deleteGenreFailure,
  deleteGenreSuccess,
  fetchGenres,
  fetchGenresFailure,
  fetchGenresSuccess,
} from "./genresSlice";

function* fetchGenresSaga(): Generator<any, void, any> {
  try {
    const songs = yield call(getGenres);
    yield put(fetchGenresSuccess(songs));
  } catch (error) {
    yield put(fetchGenresFailure());
  }
}

function* deleteArtistSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    yield call(deleteGenreApi, action.payload);
    yield put(deleteGenreSuccess(action.payload));
  } catch (error) {
    yield put(deleteGenreFailure());
  }
}

function* addGenreSaga(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const newGenre = yield call(addGenreApi, action.payload);
    yield put(addGenreSuccess(newGenre));
  } catch (error) {
    yield put(addGenreFailure());
  }
}

export function* genresSaga() {
  yield takeLatest(fetchGenres.type, fetchGenresSaga);
  yield takeLatest(deleteGenre.type, deleteArtistSaga);
  yield takeLatest(addGenre.type, addGenreSaga);
}
