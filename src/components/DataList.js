import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import { useSortBy, useTable } from 'react-table';
import csvFile from './WorldPopulation2023.csv';
import { CiCircleQuestion } from "react-icons/ci";

export default function DataList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadCSV = () => {
      // Update the file path to your CSV file
      const filePath = csvFile;

      Papa.parse(filePath, {
        download: true,
        header: true,
        complete: (results) => {
          const parsedData = results.data.map(item => ({
            Country: item['Country'],
            Population: parseFloat(item['Population2023']) || 0,
            LandArea: parseFloat(item['Land Area(Km²)']) || 0,
            Density: parseFloat(item['Density(P/Km²)']) || 0,
            MedianAge: parseFloat(item['MedianAge']) || 0,
            FertRate: parseFloat(item['Fert.Rate']) || 0,

          }));
          setData(parsedData);
        },
        error: (error) => {
          console.error('Error loading CSV:', error);
        },
      });
    };

    loadCSV();
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };
  // Define columns for the table
  const columns = React.useMemo(() => [
    {
      Header: 'No', // Column header for the row number
      accessor: 'rowNumber',
      Cell: ({ row }) => row.index + 1,
      disableSortBy: true, // Display row number
    },
    { Header: 'Country', accessor: 'Country' },
    { Header: 'Population', accessor: 'Population', Cell: ({ value }) => formatNumber(value) },
    { Header: 'Land Area(Km²)', accessor: 'LandArea', Cell: ({ value }) => formatNumber(value) },
    { Header: 'Density(P/Km²)', accessor: 'Density', Cell: ({ value }) => formatNumber(value) },
    { Header: 'Fertility Rate', accessor: 'FertRate', Cell: ({ value }) => formatNumber(value) },
    { Header: 'MedianAge', accessor: 'MedianAge', Cell: ({ value }) => formatNumber(value) },

  ], []);

  // Use the useTable and useSortBy hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy // Use the useSortBy plugin hook
  );

  return (
    <div className='overflow-y-auto max-h-[calc(100vh-80px)] bg-gray-900 rounded-md w-full'>
      <div className="fixed top-3 left-69">
        <div className="relative group">
          <span className="cursor-pointer text-gray-500">
          <CiCircleQuestion className='text-2xl' />
          </span>
          <div className="absolute hidden group-hover:block bg-white text-gray text-sm p-4 shadow-md right-0 transform translate-x-full max-w-xs overflow-hidden">
            click on the table header to sort by header field<br></br>
          </div>
        </div>
      </div>
      <table className='w-full max-h-screen' {...getTableProps()}>
        <thead className='bg-gray-900 text-white'>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className='rounded-md text-gray-900'>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={`${index % 2 === 0 ? 'bg-gray-300' : 'bg-neutral-400'}`}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
