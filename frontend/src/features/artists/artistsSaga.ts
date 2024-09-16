import { call, put, takeLatest } from "redux-saga/effects";
import { getArtists } from "../../api/artistsApi";
import {
  fetchArtists,
  fetchArtistsFailure,
  fetchArtistsSuccess,
} from "./artistsSlice";

function* fetchArtistsSaga(): Generator<any, void, any> {
  try {
    const songs = yield call(getArtists);
    yield put(fetchArtistsSuccess(songs));
  } catch (error) {
    yield put(fetchArtistsFailure());
  }
}

export function* artistsSaga() {
  yield takeLatest(fetchArtists.type, fetchArtistsSaga);
}
