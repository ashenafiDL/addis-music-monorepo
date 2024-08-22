import styled from "@emotion/styled";
import React from "react";

type Props = {
  children: React.ReactNode;
  text: String;
};

const StyledTooltipText = styled.div`
  visibility: hidden;
  background-color: var(--bg-200);
  color: var(--text-100);
  text-align: center;
  padding: 0.5rem;
  border-radius: 4px;

  /* Position the tooltip text */
  position: absolute;
  top: 50%;
  left: 150%;
  transform: translateY(-50%);
  z-index: 1;

  /* Fade in effect */
  opacity: 0;
  transition: opacity 0.3s;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    transform: translateY(-50%) rotate(180deg);
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent var(--bg-200);
  }
`;

const StyledTooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;

export default function Tooltip({ children, text }: Props) {
  return (
    <StyledTooltip>
      {children}
      <StyledTooltipText className="tooltip-text">{text}</StyledTooltipText>
    </StyledTooltip>
  );
}
