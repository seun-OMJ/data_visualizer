import React from 'react'
import { IoMdPlanet } from "react-icons/io";
import { DASHBOARD_SIDEBAR_LINKS } from '../../const_lib/sidebar_consts/const_data'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
export default function Sidebar() {
    return (
        <div className='flex flex-col bg-gray-900 w-60 text-white'>
            <div className='flex item-center  gap-2 px-1 py-3'>
                < IoMdPlanet fontSize={24} className='text-red-600'/>
                <span className='text-neutral-100 text-lg'>My Planet</span>
            </div>
            <div className='flex-1 py-8 px-1 flex flex-col gap-0.5'>{DASHBOARD_SIDEBAR_LINKS.map((item) => ( <SidebarLink key={item.key} item={item} />
        ))}</div>
            
        </div>

    )
}

function SidebarLink({ item }){
    const {pathname} = useLocation()
    return(
            <Link to={item.path} className={ classNames(pathname===item.path ?' bg-neutral-700 text-white':'text-neutral-400','flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-md text-base') }>
        <span className='text-xl'>{item.icon}</span>
        {item.label}
        </Link>
    )
}