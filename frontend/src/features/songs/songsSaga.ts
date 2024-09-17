import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { deleteSongsApi, getSongs } from "../../api/songsApi";
import {
  deleteSong,
  deleteSongFailure,
  deleteSongSuccess,
  fetchSongs,
  fetchSongsFailure,
  fetchSongsSuccess,
} from "./songsSlice";

function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    const songs = yield call(getSongs);
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    yield put(fetchSongsFailure());
  }
}

function* deleteArtistSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    yield call(deleteSongsApi, action.payload);
    yield put(deleteSongSuccess(action.payload));
    yield put(fetchSongs());
  } catch (error) {
    yield put(deleteSongFailure());
  }
}

export function* songsSaga() {
  yield takeLatest(fetchSongs.type, fetchSongsSaga);
  yield takeLatest(deleteSong.type, deleteArtistSaga);
}
