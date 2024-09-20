import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getMusicStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/stats`);
  console.log("ppppp", response.data);

  return response.data;
};
