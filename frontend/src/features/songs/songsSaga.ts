import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addSongApi,
  deleteSongsApi,
  getSongs,
  updateSongApi,
} from "../../api/songsApi";
import {
  addSong,
  addSongFailure,
  addSongSuccess,
  deleteSong,
  deleteSongFailure,
  deleteSongSuccess,
  fetchSongs,
  fetchSongsFailure,
  fetchSongsSuccess,
  updateSong,
  updateSongFailure,
  updateSongSuccess,
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
  } catch (error) {
    yield put(deleteSongFailure());
  }
}

function* addSongSaga(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const newSong = yield call(addSongApi, action.payload);
    yield put(addSongSuccess(newSong));
  } catch (error) {
    yield put(addSongFailure());
  }
}

function* updateSongSaga(
  action: PayloadAction<any>
): Generator<any, void, any> {
  try {
    const updatedSong = yield call(updateSongApi, action.payload);
    yield put(updateSongSuccess(updatedSong));
  } catch (error) {
    yield put(updateSongFailure());
  }
}

export function* songsSaga() {
  yield takeLatest(fetchSongs.type, fetchSongsSaga);
  yield takeLatest(deleteSong.type, deleteArtistSaga);
  yield takeLatest(addSong.type, addSongSaga);
  yield takeLatest(updateSong.type, updateSongSaga);
}
