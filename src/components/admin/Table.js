import styled from "styled-components";
import { useTable, useGlobalFilter } from "react-table";
import { useMemo } from "react";
import { COLUMNS } from "./Columns";
import MOCK_DATA from "./MOCK_DATA.json";
import Spacer from "../Spacer";
import Filter from "./Filter";

const TableWrapper = styled.div`
  background-color: #ffffff;
`;

const TableInner = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  background-color: #ffffff;

  td {
    border: 1px solid #efebf1;
    border-left: none;
    border-right: none;
    padding: 1.8rem;
    color: #828282;
    font-family: Gordita;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0px;
  }

  // tr:nth-child(even) {
  //   background-color: #f2f2f2;
  // }

  // tr:hover {
  //   background-color: #ddd;
  // }

  th {
    padding: 1.8rem;
    text-align: left;
    color: #899198;
    text-transform: uppercase;
    font-family: Gordita Regular;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
  }

  .checkbox {
    padding: 0 2.4rem;
  }
`;

const Table = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <>
      <Spacer y={4.8} />
      <TableWrapper>
        <Spacer y={4.8} />
        <Filter filter={globalFilter} setFilter={setGlobalFilter} />
        <Spacer y={2.4} />
        <TableInner {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {/* <th className="checkbox">
                  <CheckBox grey name={`select_all`} />
                </th> */}
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {/* <td className="checkbox">
                    <CheckBox name={`row_${row.id}`} grey />
                  </td> */}
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </TableInner>
      </TableWrapper>
      <Spacer y={4.8} />
    </>
  );
};

export default Table;
