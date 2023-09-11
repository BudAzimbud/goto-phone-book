/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import CenterContainer from "./CenterContainer";
import BetweenContainer from "./BetweenContainer";

const tableStyles = css`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
`;

const thStyles = css`
  background-color: #f2f2f2;
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const tdStyles = css`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Table = styled.table`
  ${tableStyles}
`;

const TableHeader = styled.th`
  ${thStyles}
  width: ${(props) => props.width || "auto"};
  background-color: ${(props) => props.bgColor};
`;

const TableData = styled.td`
  ${tdStyles}
`;

const TableContainer = styled.div`
  overflow-x: scroll;
  width: 100%;
`;

interface Data {}
export interface Columns {}

type Props = {
  data: Data[];
  columns: Columns[];
  loading: boolean;
  page: number;
  onButtonRightClick: () => void;
  onButtonLeftClick: () => void;
  onClickHeader: () => void;
};

function EmotionTable({
  data = [],
  columns = [],
  loading,
  page,
  onButtonLeftClick,
  onButtonRightClick,
  onClickHeader,
}: Props) {
  const tableRef = useRef(null);
  const [ascHeader, setAscHeader] = useState("");

  return (
    <TableContainer>
      <Table ref={tableRef}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <TableHeader
                onClick={() => {
                  if (column.key) {
                    onClickHeader(column.key);
                    setAscHeader(column.key);
                  }
                }}
                key={index}
                width={column.width}
                bgColor={ascHeader === column.key ? "grey" : ""}
              >
                {column.name}
              </TableHeader>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableData key={colIndex}>
                  {column.render
                    ? column.render(item, rowIndex, columns)
                    : item[column.name]}
                </TableData>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      {loading && <div>Loading...</div>}
      {data.length > 0 ? (
        <CenterContainer>
          <Button onClick={onButtonLeftClick}>{"<"}</Button>
          <span style={{ fontSize: 20, padding: "0 6px", color: "grey" }}>
            {page}
          </span>
          <Button onClick={onButtonRightClick}>{">"}</Button>
        </CenterContainer>
      ) : (
        <CenterContainer>
          <h4>Not found data on page : {page}</h4>
        </CenterContainer>
      )}
    </TableContainer>
  );
}

export default EmotionTable;
