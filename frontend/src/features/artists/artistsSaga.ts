import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addArtistApi,
  deleteArtistApi,
  getArtists,
} from "../../api/artistsApi";
import {
  addArtist,
  addArtistFailure,
  addArtistSuccess,
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
  } catch (error) {
    yield put(deleteArtistFailure());
  }
}

function* addArtistSaga(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const newArtist = yield call(addArtistApi, action.payload);
    yield put(addArtistSuccess(newArtist));
    yield put(fetchArtists()); // Fetch updated artists list after adding
  } catch (error) {
    yield put(addArtistFailure());
  }
}

export function* artistsSaga() {
  yield takeLatest(fetchArtists.type, fetchArtistsSaga);
  yield takeLatest(deleteArtist.type, deleteArtistSaga);
  yield takeLatest(addArtist.type, addArtistSaga);
}
