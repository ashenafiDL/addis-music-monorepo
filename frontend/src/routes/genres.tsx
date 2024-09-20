/** @jsxImportSource @emotion/react */

import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton } from "../components/button";
import GenreModal from "../components/GenreModal";
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
  addGenre,
  deleteGenre,
  fetchGenres,
  Genre,
  updateGenre,
} from "../features/genres/genresSlice";

export default function Genres() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingGenre, setIsAddingGenre] = useState(false);
  const [currentGenre, setCurrentGenre] = useState<Genre | undefined>();
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.genres.loading);
  const genres = useSelector((state: any) => state.genres.genres);

  const handleAdd = (data: any) => {
    dispatch(addGenre(data));
  };

  const handleUpdate = (data: any) => {
    dispatch(updateGenre(data));
  };

  const handleDelete = (genreId: string) => {
    dispatch(deleteGenre(genreId));
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <div>
      <HeaderContainer>
        <Header>Genres</Header>

        <StyledButton
          onClick={() => {
            setIsAddingGenre(true);
            setIsModalOpen(true);
          }}
        >
          <IconPlus size={20} /> Add new
        </StyledButton>
      </HeaderContainer>

      <div css={{ color: "var(--text-200)" }}>
        {loading ? "Updating genre list..." : `Total: ${genres.length}`}
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
                <IconPencil
                  size={20}
                  onClick={() => {
                    setCurrentGenre({ ...genre, _id: genre._id });
                    setIsModalOpen(true);
                  }}
                />
                <IconTrash
                  color="red"
                  size={20}
                  onClick={() => handleDelete(genre._id)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>

      {isAddingGenre && (
        <GenreModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsAddingGenre(false);
          }}
          onSubmit={handleAdd}
        />
      )}

      {currentGenre !== undefined && (
        <GenreModal
          existingData={currentGenre}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentGenre(undefined);
          }}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}
