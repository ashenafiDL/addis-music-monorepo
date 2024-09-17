/** @jsxImportSource @emotion/react */

import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { deleteSong, fetchSongs } from "../features/songs/songsSlice";
import formatDate from "../utils/formatDate";

export default function Songs() {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.songs.loading);
  const songs = useSelector((state: any) => state.songs.songs);

  const handleDelete = (songId: string) => {
    dispatch(deleteSong(songId));
  };

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <div>
      <HeaderContainer>
        <Header>Songs</Header>

        <StyledButton>
          <IconPlus size={20} /> Add new
        </StyledButton>
      </HeaderContainer>

      <div css={{ color: "var(--text-200)" }}>
        {loading ? "Updating song list..." : `Total: ${songs.length}`}
      </div>

      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableHeader>#</StyledTableHeader>
            <StyledTableHeader>Title</StyledTableHeader>
            <StyledTableHeader>Artist</StyledTableHeader>
            <StyledTableHeader>Album</StyledTableHeader>
            <StyledTableHeader>Genres</StyledTableHeader>
            <StyledTableHeader>Release Date</StyledTableHeader>
            <StyledTableHeader>Actions</StyledTableHeader>
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          {songs.map((song: any, index: number) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{song.title}</StyledTableCell>
              <StyledTableCell>{song?.artist?.name || "-"}</StyledTableCell>
              <StyledTableCell>{song?.album?.title || "-"}</StyledTableCell>
              <StyledTableCell>
                {song.genres.map((genre: any) => genre.name).join(", ") || "-"}
              </StyledTableCell>
              <StyledTableCell>
                {song.releaseDate ? formatDate(song.releaseDate) : "-"}
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
                <IconPencil size={20} />
                <IconTrash
                  color="red"
                  size={20}
                  onClick={() => handleDelete(song._id)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </div>
  );
}
