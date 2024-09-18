import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getArtists = async () => {
  const response = await axios.get(`${API_BASE_URL}/artists`);
  return response.data;
};

export const deleteArtistApi = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/artists/${id}`);
};

export const addArtistApi = async (newArtist: any) => {
  const response = await axios.post(`${API_BASE_URL}/artists`, newArtist);
  return response.data;
};
