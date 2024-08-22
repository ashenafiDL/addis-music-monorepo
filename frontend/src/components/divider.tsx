import styled from "@emotion/styled";

type Props = {
  direction: "horizontal" | "vertical";
};

const HorizontalDivider = styled.div`
  border-top: 1px solid var(--bg-300);
  width: 100%;
`;

const VerticalDivider = styled.div`
  border-right: 1px solid var(--bg-300);
`;

export default function Divider({ direction }: Props) {
  if (direction === "horizontal") return <HorizontalDivider />;
  else return <VerticalDivider />;
}
