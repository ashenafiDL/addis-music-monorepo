import styled from "@emotion/styled";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: var(--bg-200);
  padding: 2rem;
  width: 350px;
  max-width: 90%;
  border-radius: 8px;
  color: var(--text-100);
`;
