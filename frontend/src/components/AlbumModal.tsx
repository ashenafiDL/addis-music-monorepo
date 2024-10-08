/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtists } from "../features/artists/artistsSlice";
import { fetchGenres } from "../features/genres/genresSlice";
import { ButtonContainer, StyledButton } from "./button";
import { Form, FormElement, Input, Label, Select } from "./form";
import { ModalBackground, ModalContainer } from "./modal";

type Props = {
  isOpen: boolean;
  onClose: Function;
  onSubmit: Function;
  existingData?: any;
};

export default function AlbumModal({
  isOpen,
  onClose,
  onSubmit,
  existingData,
}: Props) {
  const dispatch = useDispatch();
  const artists = useSelector((state: any) => state.artists.artists);
  const genres = useSelector((state: any) => state.genres.genres);

  const [formData, setFormData] = useState({
    title: existingData?.title || "",
    artist: existingData?.artist?.name || "",
    genres: existingData?.genres || [],
    releaseDate: existingData?.releaseDate || "",
  });

  const handleChange = (e: any) => {
    const { name, value, options, multiple } = e.target;

    if (multiple) {
      const selectedValues = Array.from(options)
        .filter((option: any) => option.selected)
        .map((option: any) => option.value);

      setFormData({
        ...formData,
        [name]: selectedValues,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ ...formData, _id: existingData?._id });
    setFormData({
      title: "",
      artist: "",
      genres: [],
      releaseDate: "",
    });
    onClose();
  };

  useEffect(() => {
    dispatch(fetchArtists());
    dispatch(fetchGenres());
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <h2
          css={{
            marginTop: "0",
            marginBottom: "2rem",
          }}
        >
          {existingData === undefined ? "Add Album" : "Update Album"}
        </h2>
        <Form onSubmit={handleSubmit}>
          <FormElement>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormElement>
          <FormElement>
            <Label>Artist</Label>
            <Select
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
            >
              <option value="">Select an artist</option>
              {artists.map((artist: any) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </Select>
          </FormElement>

          <FormElement>
            <Label>Genres</Label>
            <Select
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              required
              multiple
            >
              {genres.map((genre: any) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </Select>
          </FormElement>
          <FormElement>
            <Label>Release Date</Label>
            <Input
              css={{
                color: "var(--text-100)",
              }}
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
            />
          </FormElement>
          <ButtonContainer>
            <StyledButton
              type="reset"
              onClick={() => {
                setFormData({
                  title: "",
                  artist: "",
                  genres: [],
                  releaseDate: "",
                });
                onClose();
              }}
              css={{ backgroundColor: "red" }}
            >
              Cancel
            </StyledButton>
            <StyledButton type="submit">
              {existingData === undefined ? "Add" : "Update"}
            </StyledButton>
          </ButtonContainer>
        </Form>
      </ModalContainer>
    </ModalBackground>
  );
}
