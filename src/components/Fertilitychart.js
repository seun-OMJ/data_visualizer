import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import csvFile from './WorldPopulation2023.csv';


const Fertilitychart = () => {
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
                        Population: item['Population2023'],
                        Fertility_Rate: item['Fert.Rate']
                    }))
                         // Ensure only valid fertility rates are included
                        .sort((a, b) => b.Population - a.Population) // Sort by fertility rate descending
                        .slice(0, 10); // Take the top 10 highest fertility rates
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
        <div className='h-[16rem] bg-gray-900 p-2 rounded-md border border-gray-200 flex flex-col flex-1'>
            <strong className='text-white font-medium'>Fertility rate</strong>
            <div className='w-full mt-2 flex-1 text-xs'>
                <ResponsiveContainer width="100%" height={120}>
                    <LineChart
                        width={500}
                        height={120}
                        data={data}
                        margin={{
                            top: 10, right: 10, left: -10, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" />
                        <XAxis dataKey="Country" tick={{ fill: 'white' }}/>
                        <YAxis tick={{ fill: 'white' }}/>
                        <Tooltip tick={{ fill: 'red' }}/>
                        <Legend />
                        <Line type="monotone" dataKey="Fertility_Rate" stroke="green" activeDot={{ r: 8 }}  />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Fertilitychart;
