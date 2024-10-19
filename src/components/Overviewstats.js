import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import { GiAges } from "react-icons/gi";
import { FaLongArrowAltUp } from "react-icons/fa";
import { TbGridDots } from "react-icons/tb";
import { FcGlobe } from "react-icons/fc";


import csvFile from './WorldPopulation2023.csv';

export default function Overviewstats() {
    const [totalGrowthPercent, setTotalGrowthPercent] = useState(0);
    const [totalPopulation, totalSum] = useState(0)
    const [averageDensity, setAverageDensity] = useState(0)
    const [worldMedianAge, setWorldMedianAge] = useState(0);

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
                        LandArea: parseFloat(item['Land Area(Km²)']),
                        Density: parseFloat(item['Density(P/Km²)']),
                        Population: parseInt(item['Population2023']),
                        MedianAge: parseFloat(item['MedianAge']),
                        NetChange: parseInt(item['NetChange'])
                    }))
                    
                    const totalPopulation = parsedData.reduce((acc, curr) => acc + (isNaN(curr.Population) ? 0 : curr.Population), 0);
                    totalSum(totalPopulation)
                    const totalWeightedGrowth = parsedData.reduce((acc, curr) => acc + (isNaN(curr.NetChange) ? 0 : curr.NetChange), 0);
            
                    // Calculate the total growth percent
                    const totalGrowthPercent = (totalPopulation > 0 ? (totalWeightedGrowth / totalPopulation) * 100 : 0).toFixed(2)
                    setTotalGrowthPercent(totalGrowthPercent)

                     // Calculate average density
                const totalLandArea = parsedData.reduce((acc, curr) => acc +  (isNaN(curr.LandArea) ? 0 : curr.LandArea), 0);
                const averageDensity = (totalLandArea > 0 ? totalPopulation / totalLandArea : 0).toFixed(2)

                setAverageDensity(averageDensity);
                const sortedData = parsedData.sort((a, b) => a.MedianAge - b.MedianAge);

                    // Step 2: Calculate total population
                    const halfPopulation = totalPopulation / 2;

                    // Step 3: Find the median age
                    let cumulativePopulation = 0;
                    let worldMedianAge = 0;

                    for (const Country of sortedData) {
                        cumulativePopulation += Country.Population;
                        if (cumulativePopulation >= halfPopulation) {
                            worldMedianAge = Country.MedianAge;
                            break;
                        }
                    }
                    setWorldMedianAge(worldMedianAge);

                        
                },
                error: (error) => {
                    console.error('Error loading CSV:', error);
                }
            });
        };

        loadCSV();
    }, []);






    return (
        <div className='flex gap-4 w-full '>
            <Wrapper>
                <div className='h-12 w-12 flex items-center justify-center'><FcGlobe className='text-2xl' /></div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-400 font-light'>Population</span>

                    <div className='flex items-center'>
                        <strong className='text-xl text-gray-200 font-semibold'>{totalPopulation.toLocaleString()}</strong>
                    </div>
                </div>
            </Wrapper>
            <Wrapper>
                <div className='h-12 w-12 flex items-center justify-center'><FaLongArrowAltUp className='text-2xl text-green-500' /></div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-400 font-light'>Growth%</span>

                    <div className='flex items-center'>
                        <strong className='text-xl text-gray-200 font-semibold'>{totalGrowthPercent}%</strong>
                    </div>
                </div>
            </Wrapper>
            <Wrapper>
                <div className='h-12 w-12 flex items-center justify-center'><TbGridDots className='text-2xl text-amber-600' /></div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-400 font-light'>Density</span>

                    <div className='flex items-center'>
                        <strong className='text-xl text-gray-200 font-semibold'>{averageDensity}/km<sup>2</sup></strong>
                    </div>
                </div>
            </Wrapper>
            <Wrapper>
                <div className='h-12 w-12 flex items-center justify-center'><GiAges className='text-2xl text-blue-500' /></div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-400 font-light'>World Age</span>

                    <div className='flex items-center'>
                        <strong className='text-xl text-gray-200 font-semibold'>{worldMedianAge}years</strong>
                    </div>
                </div>
            </Wrapper>


        </div>
    )
}
function Wrapper({ children }) {
    return <div className='bg-gray-900 rounded-md p-4 flex-1 border border-gray-00 flex items-center'>{children}</div>
}
