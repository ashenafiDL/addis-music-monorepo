import styled from "@emotion/styled";

const StyledButton = styled.button`
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: var(--accent-100);
  color: var(--text-100);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    opacity: 0.8;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export { ButtonContainer, StyledButton };
