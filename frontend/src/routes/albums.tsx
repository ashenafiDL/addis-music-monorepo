/** @jsxImportSource @emotion/react */

import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton } from "../components/button";
import Header, { HeaderContainer } from "../components/header";
import Loading from "../components/loading";
import {
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeader,
  StyledTableRow,
} from "../components/table";
import { fetchAlbums } from "../features/albums/albumsSlice";
import formatDate from "../utils/formatDate";

export default function Albums() {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.albums.loading);
  const albums = useSelector((state: any) => state.albums.albums);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  return (
    <div>
      <HeaderContainer>
        <Header>Albums</Header>
        <StyledButton>
          <IconPlus size={20} /> Add new
        </StyledButton>
      </HeaderContainer>

      {loading ? (
        <Loading />
      ) : (
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
            {albums.map((album: any, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{album.title}</StyledTableCell>
                <StyledTableCell>{album?.artist?.name || "-"}</StyledTableCell>
                <StyledTableCell>{album?.album?.title || "-"}</StyledTableCell>
                <StyledTableCell>
                  {album.genres.map((genre: any) => genre.name).join(", ") ||
                    "-"}
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
                  <IconPencil size={20} />
                  <IconTrash color="red" size={20} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </StyledTableBody>
        </StyledTable>
      )}
    </div>
  );
}
