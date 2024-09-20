/** @jsxImportSource @emotion/react */

import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArtistModal from "../components/ArtistModal";
import { StyledButton } from "../components/button";
import Header, { HeaderContainer } from "../components/header";
import {
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeader,
  StyledTableRow,
} from "../components/table";
import {
  addArtist,
  Artist,
  deleteArtist,
  fetchArtists,
  updateArtist,
} from "../features/artists/artistsSlice";

export default function Artists() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingArtist, setIsAddingArtist] = useState(false);
  const [currentArtist, setCurrentArtist] = useState<any | undefined>();
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.artists.loading);
  const artists = useSelector((state: any) => state.artists.artists);

  const handleAdd = (data: any) => {
    dispatch(addArtist(data));
  };

  const handleUpdate = (data: Artist) => {
    dispatch(updateArtist(data));
  };

  const handleDelete = (artistId: string) => {
    dispatch(deleteArtist(artistId));
  };

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <div>
      <HeaderContainer>
        <Header>Artists</Header>
        <StyledButton
          onClick={() => {
            setIsAddingArtist(true);
            setIsModalOpen(true);
          }}
        >
          <IconPlus size={20} /> Add new
        </StyledButton>
      </HeaderContainer>

      <div css={{ color: "var(--text-200)" }}>
        {loading ? "Updating artist list..." : `Total: ${artists.length}`}
      </div>

      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableHeader>#</StyledTableHeader>
            <StyledTableHeader>Name</StyledTableHeader>
            <StyledTableHeader>Description</StyledTableHeader>
            <StyledTableHeader>Actions</StyledTableHeader>
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          {artists.map((artist: any, index: number) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{artist.name}</StyledTableCell>
              <StyledTableCell>{artist.bio}</StyledTableCell>
              <StyledTableCell
                css={{
                  display: "flex",
                  gap: ".8rem",
                  alignItems: "center",
                  "&:hover > *": {
                    cursor: "pointer",
                  },
                }}
              >
                <IconPencil
                  size={20}
                  onClick={() => {
                    setCurrentArtist({ ...artist, _id: artist._id });
                    setIsModalOpen(true);
                  }}
                />
                <IconTrash
                  color="red"
                  size={20}
                  onClick={() => handleDelete(artist._id)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>

      {isAddingArtist && (
        <ArtistModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsAddingArtist(false);
          }}
          onSubmit={handleAdd}
        />
      )}

      {currentArtist !== undefined && (
        <ArtistModal
          existingData={currentArtist}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentArtist(undefined);
          }}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}
