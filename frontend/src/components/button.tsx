import styled from "@emotion/styled";

const StyledButton = styled.button`
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: var(--accent-100);
  color: var(--text-100);
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export default StyledButton;
