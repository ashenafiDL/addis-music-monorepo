import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { deleteGenreApi, getGenres } from "../../api/genresApi";
import {
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
    yield put(fetchGenres());
  } catch (error) {
    yield put(deleteGenreFailure());
  }
}

export function* genresSaga() {
  yield takeLatest(fetchGenres.type, fetchGenresSaga);
  yield takeLatest(deleteGenre.type, deleteArtistSaga);
}
