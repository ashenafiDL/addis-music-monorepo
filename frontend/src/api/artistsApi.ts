import axios from "axios";
import { Artist } from "../features/artists/artistsSlice";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getArtists = async () => {
  const response = await axios.get(`${API_BASE_URL}/artists`);
  return response.data;
};

export const deleteArtistApi = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/artists/${id}`);
};

export const addArtistApi = async (newArtist: Artist) => {
  const response = await axios.post(`${API_BASE_URL}/artists`, newArtist);
  return response.data;
};

export const updateArtistApi = async (newArtist: Artist) => {
  const response = await axios.patch(
    `${API_BASE_URL}/artists/${newArtist._id}`,
    newArtist
  );

  return response.data.updatedArtist;
};
