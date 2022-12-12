import React, { useMemo } from 'react';
import { useBlockLayout, useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import { COLUMNS, GROUPED_COLUMNS } from './Column';
import MOCK_DATA from './MOCK_DATA.json';
import './table.css';
import { Styles } from './TableStyles';

export const StickyTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  // const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  // columns: columns
  // data: data
  // or the ES6 shortcut down below
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useBlockLayout,
    useSticky
  );

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

  const firstPageRows = rows.slice(0, 20);

  console.log(tableInstance);

  return (
    <Styles>
      <div
        {...getTableProps()}
        className="table sticky"
        style={{ width: 1000, height: 500 }}
      >
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="body">
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
  );
};
