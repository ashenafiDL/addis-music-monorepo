/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { Artist } from "../features/artists/artistsSlice";
import { ButtonContainer, StyledButton } from "./button";
import { Form, FormElement, Input, Label, Textarea } from "./form";
import { ModalBackground, ModalContainer } from "./modal";

type Props = {
  isOpen: boolean;
  onClose: Function;
  onSubmit: Function;
  existingData?: Artist;
};

export default function ArtistModal({
  isOpen,
  onClose,
  onSubmit,
  existingData,
}: Props) {
  const [formData, setFormData] = useState({
    name: existingData?.name || "",
    bio: existingData?.bio || "",
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
      bio: "",
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
          {existingData === undefined ? "Add Artist" : "Edit Artist"}
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
            <Label>Short Bio</Label>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter short bio..."
            />
          </FormElement>

          <ButtonContainer>
            <StyledButton
              type="reset"
              onClick={() => {
                setFormData({
                  name: "",
                  bio: "",
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
