import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { COLUMNS, GROUPED_COLUMNS } from './Column';
import MOCK_DATA from './MOCK_DATA.json';
import './table.css';

export const BasicTable = () => {
  // const columns = useMemo(() => COLUMNS, []);
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  // columns: columns
  // data: data
  // or the ES6 shortcut down below
  const tableInstance = useTable({
    columns,
    data,
  });

  // one method but not optimized
  // useTable({
  //   columns: COLUMNS,
  //   data: MOCK_DATA
  // })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  console.log(tableInstance);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td {...column.getFooterProps()}>{column.render('Header')}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};
