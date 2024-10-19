
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';

import csvFile from './WorldPopulation2023.csv';

const formatNumber = (num) => num.toLocaleString();
export default function Popcharts() {
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
                      Density: item['Density'],
                      Population: parseInt(item['Population2023']),
                      FertRate: item['Fert.Rate']
                  }))
                      .sort((a, b) => b.Population - a.Population) 
                      .slice(0, 10);
                  setData(parsedData);
              },
              error: (error) => {
                  console.error('Error loading CSV:', error);
              }
          });
      };

      loadCSV();
  }, []);



  return (

    <div className='h-[19rem] bg-gray-900 p-4 rounded-md border border-gray-200 flex flex-col flex-1'>
      <strong className='text-white font-medium'>Population chart</strong>
      <div className='w-full mt-3 flex-1 text-xs'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={400} height={50} data={data} margin={{ top: 20, right: 5, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis  dataKey="Country" tick={{ fill: '#e5e5e5' }} />
            <YAxis type="number" domain={[0, 1500000000]} tickFormatter={formatNumber} tick={{ fill: '#e5e5e5' }} />
            <Tooltip formatter={(value) => [formatNumber(value), 'Population']} />
            <Legend />

            <Bar dataKey="Population" fill="#058c42" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
