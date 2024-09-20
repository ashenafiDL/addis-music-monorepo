import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getAlbums = async () => {
  const response = await axios.get(`${API_BASE_URL}/albums`);
  return response.data;
};

export const deleteAlbumApi = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/albums/${id}`);
};

export const addAlbumApi = async (newAlbum: any) => {
  const response = await axios.post(`${API_BASE_URL}/albums`, newAlbum);
  console.log(response.data);

  return response.data;
};

export const updateAlbumApi = async (newAlbum: any) => {
  const response = await axios.patch(
    `${API_BASE_URL}/albums/${newAlbum._id}`,
    newAlbum
  );

  return response.data.updatedAlbum;
};
