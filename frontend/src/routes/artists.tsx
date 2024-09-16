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
import { fetchArtists } from "../features/artists/artistsSlice";

export default function Artists() {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.artists.loading);
  const artists = useSelector((state: any) => state.artists.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <div>
      <HeaderContainer>
        <Header>Artists</Header>
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
