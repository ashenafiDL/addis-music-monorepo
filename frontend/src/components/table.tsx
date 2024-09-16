import styled from "@emotion/styled";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 1rem;
  font-family: "Arial", sans-serif;
  text-align: left;
  color: var(--text-100);
`;

const StyledTableHead = styled.thead`
  background-color: var(--bg-200);
  font-weight: bold;
`;

const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--bg-200);
  }
`;

const StyledTableHeader = styled.th`
  padding: 12px;
`;

const StyledTableCell = styled.td`
  padding: 12px;
`;

const StyledTableBody = styled.tbody`
  background-color: var(--bg-100);
`;

export {
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeader,
  StyledTableRow,
};
