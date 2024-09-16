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
import { fetchGenres } from "../features/genres/genresSlice";

export default function Genres() {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.genres.loading);
  const genres = useSelector((state: any) => state.genres.genres);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <div>
      <HeaderContainer>
        <Header>Genres</Header>

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
            {genres.map((genre: any, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{genre.name}</StyledTableCell>
                <StyledTableCell>{genre.description}</StyledTableCell>
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
