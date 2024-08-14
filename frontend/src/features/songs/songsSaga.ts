import { call, put, takeLatest } from "redux-saga/effects"
import { getSongs } from "../../api/songsApi"
import { fetchSongs, fetchSongsFailure, fetchSongsSuccess } from "./songsSlice"

function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    const songs = yield call(getSongs)
    yield put(fetchSongsSuccess(songs))
  } catch (error) {
    yield put(fetchSongsFailure())
  }
}

export function* songsSaga() {
  yield takeLatest(fetchSongs.type, fetchSongsSaga)
}
