/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";

const StyledLoading = styled.div`
  border: 8px solid var(--bg-100);
  border-top: 8px solid var(--primary-100);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default function Loading() {
  return (
    <StyledContainer>
      <StyledLoading />
      <p
        css={{
          textAlign: "center",
          marginTop: "1rem",
          color: "var(--text-100)",
        }}
      >
        Loading...
      </p>
    </StyledContainer>
  );
}
