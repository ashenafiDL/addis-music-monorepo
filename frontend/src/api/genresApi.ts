import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getGenres = async () => {
  const response = await axios.get(`${API_BASE_URL}/genres`);
  return response.data;
};
