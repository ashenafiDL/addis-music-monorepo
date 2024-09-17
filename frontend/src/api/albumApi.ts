import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Get all albums
export const getAlbums = async () => {
  const response = await axios.get(`${API_BASE_URL}/albums`);
  return response.data;
};

// Delete album by ID
export const deleteAlbumApi = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/albums/${id}`);
};
