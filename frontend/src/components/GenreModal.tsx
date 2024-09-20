/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { Genre } from "../features/genres/genresSlice";
import { ButtonContainer, StyledButton } from "./button";
import { Form, FormElement, Input, Label, Textarea } from "./form";
import { ModalBackground, ModalContainer } from "./modal";

type Props = {
  isOpen: boolean;
  onClose: Function;
  onSubmit: Function;
  existingData?: Genre;
};

export default function GenreModal({
  isOpen,
  onClose,
  onSubmit,
  existingData,
}: Props) {
  const [formData, setFormData] = useState({
    name: existingData?.name || "",
    description: existingData?.description || "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ ...formData, _id: existingData?._id });
    setFormData({
      name: "",
      description: "",
    });
    onClose();
  };

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
          {existingData === undefined ? "Add Genre" : "Update Genre"}
        </h2>
        <Form onSubmit={handleSubmit}>
          <FormElement>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormElement>
          <FormElement>
            <Label>Short description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter short description..."
            />
          </FormElement>

          <ButtonContainer>
            <StyledButton
              type="reset"
              onClick={() => {
                setFormData({
                  name: "",
                  description: "",
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
