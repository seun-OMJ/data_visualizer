import React from 'react'
import { ResponsiveContainer, Pie, PieChart, Cell, Legend } from 'recharts'

const data = [
    { name: 'Male', value: 50.4},
    { name: 'Female', value: 49.6 }
];

const RADIAN = Math.PI / 180
const COLORS = ['#d97706', '#3b82f6']

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(1)}%`}
		</text>
	)
}

    export default function Genderchart() {
        return (
            <div className='w-[20rem] h-[19rem] bg-gray-900 p-4 rounded-md flex flex-col'>
                <strong className='text-white font-medium'>Gender chart</strong>
                <div className='w-full mt-3 flex-1 text-xs'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={270} height={170}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="45%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={95}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>

                </div>
            </div>
        )
    }
