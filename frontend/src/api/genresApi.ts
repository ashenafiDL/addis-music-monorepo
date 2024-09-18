import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getGenres = async () => {
  const response = await axios.get(`${API_BASE_URL}/genres`);
  return response.data;
};

export const deleteGenreApi = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/genres/${id}`);
};

export const addGenreApi = async (newGenre: any) => {
  const response = await axios.post(`${API_BASE_URL}/genres`, newGenre);
  return response.data;
};
