/** @jsxImportSource @emotion/react */

import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlbumModal from "../components/AlbumModal";
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
  addAlbum,
  Album,
  deleteAlbum,
  fetchAlbums,
  updateAlbum,
} from "../features/albums/albumsSlice";
import formatDate from "../utils/formatDate";

export default function Albums() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingAlbum, setIsAddingAlbum] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState<any | undefined>();
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.albums.loading);
  const albums = useSelector((state: any) => state.albums.albums);

  const handleAdd = (data: Album) => {
    dispatch(addAlbum(data));
  };

  const handleUpdate = (data: Album) => {
    dispatch(updateAlbum(data));
  };

  const handleDelete = (albumId: string) => {
    dispatch(deleteAlbum(albumId));
  };

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  return (
    <div>
      <HeaderContainer>
        <Header>Albums</Header>
        <StyledButton
          onClick={() => {
            setIsAddingAlbum(true);
            setIsModalOpen(true);
          }}
        >
          <IconPlus size={20} /> Add new
        </StyledButton>
      </HeaderContainer>

      <div css={{ color: "var(--text-200)" }}>
        {loading ? "Updating album list..." : `Total: ${albums.length}`}
      </div>

      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableHeader>#</StyledTableHeader>
            <StyledTableHeader>Title</StyledTableHeader>
            <StyledTableHeader>Artist</StyledTableHeader>
            <StyledTableHeader>Genres</StyledTableHeader>
            <StyledTableHeader>Release Date</StyledTableHeader>
            <StyledTableHeader>Actions</StyledTableHeader>
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          {albums.map((album: any, index: number) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{album.title}</StyledTableCell>
              <StyledTableCell>{album?.artist?.name || "-"}</StyledTableCell>
              <StyledTableCell>
                {album.genres.map((genre: any) => genre.name).join(", ") || "-"}
              </StyledTableCell>
              <StyledTableCell>
                {album.releaseDate ? formatDate(album.releaseDate) : "-"}
              </StyledTableCell>
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
                    setCurrentAlbum({ ...album, _id: album._id });
                    setIsModalOpen(true);
                  }}
                />
                <IconTrash
                  color="red"
                  size={20}
                  onClick={() => {
                    handleDelete(album._id);
                  }}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>

      {currentAlbum !== undefined && (
        <AlbumModal
          existingData={currentAlbum}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentAlbum(undefined);
          }}
          onSubmit={handleUpdate}
        />
      )}

      {isAddingAlbum && (
        <AlbumModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsAddingAlbum(false);
          }}
          onSubmit={handleAdd}
        />
      )}
    </div>
  );
}
