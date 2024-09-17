import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { deleteArtistApi, getArtists } from "../../api/artistsApi";
import {
  deleteArtist,
  deleteArtistFailure,
  deleteArtistSuccess,
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

function* deleteArtistSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    yield call(deleteArtistApi, action.payload);
    yield put(deleteArtistSuccess(action.payload));
    yield put(fetchArtists());
  } catch (error) {
    yield put(deleteArtistFailure());
  }
}

export function* artistsSaga() {
  yield takeLatest(fetchArtists.type, fetchArtistsSaga);
  yield takeLatest(deleteArtist.type, deleteArtistSaga);
}
