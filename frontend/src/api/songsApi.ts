import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getSongs = async () => {
  const response = await axios.get(`${API_BASE_URL}/songs`);
  return response.data;
};

export const deleteSongsApi = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/songs/${id}`);
};

export const addSongApi = async (newSong: any) => {
  const response = await axios.post(`${API_BASE_URL}/songs`, newSong);
  return response.data;
};
