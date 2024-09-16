import { call, put, takeLatest } from "redux-saga/effects";
import { getGenres } from "../../api/genresApi";
import {
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

export function* genresSaga() {
  yield takeLatest(fetchGenres.type, fetchGenresSaga);
}
