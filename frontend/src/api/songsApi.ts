import axios from "axios";
import { Song } from "../features/songs/songsSlice";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getSongs = async () => {
  const response = await axios.get(`${API_BASE_URL}/songs`);
  return response.data;
};

export const deleteSongsApi = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/songs/${id}`);
};

export const addSongApi = async (newSong: Song) => {
  const response = await axios.post(`${API_BASE_URL}/songs`, newSong);
  return response.data;
};

export const updateSongApi = async (newSong: Song) => {
  const response = await axios.patch(
    `${API_BASE_URL}/songs/${newSong._id}`,
    newSong
  );

  return response.data.updatedSong;
};
