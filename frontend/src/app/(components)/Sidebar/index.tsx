"use client";

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/app/state';
import { Inbox, Layout, LucideIcon, Menu, Users, Leaf } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed: boolean;
}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed
}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href}>
            <div className={`cursor-pointer flex items-center 
            ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"} hover: text-blue-500 hover:bg-blue-100 
            gap-3 transition-colors ${isActive ? "bg-blue-200 text-white" : ""}`}
            >
                <div className={`flex ${isCollapsed ? 'flex-col items-center' : 'flex-row items-center'}`}>
                    <Icon className='w-6 h-6 !text-gray-700' />
                    {isCollapsed && (
                        <span className="text-xs mt-1 text-gray-700">{label}</span>
                    )}
                </div>
                <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>
                    {label}
                </span>
            </div>
        </Link>);

};

const Sidebar = () => {
    
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
    );

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    };

    const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} 
    bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;


  return (
    <div className={sidebarClassNames}>
        {/* TOP LOGO */}
        <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"}`}>
            <div><Leaf className='w-6 h-6 text-green-600' /></div>
            <h1 className={`${isSidebarCollapsed? "hidden": "block"} font-extrabold text-2xl`}>CONTEXTI</h1>
        
            <button className='md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={toggleSidebar}>
                <Menu className='w-4 h-4'></Menu>
            </button>
        </div>

        {/* Horizontal Line */}
        <hr className={`my-4 ${isSidebarCollapsed ? 'mx-2' : 'mx-8'} border-t border-gray-200`} />

        {/* LINKS */}
        <div className='flex-grow mt-8'>
            <SidebarLink 
                href="/dashboard" 
                icon={Layout} 
                label="Dashboard" 
                isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink 
                href="/inbox" 
                icon={Inbox} 
                label="Inbox" 
                isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
                href="/clients"
                icon={Users}
                label="Clients"
                isCollapsed={isSidebarCollapsed}
            />
            {/* <SidebarLink
                href='/projects'
                icon={Briefcase}
                label="Projects"
                isCollapsed={isSidebarCollapsed}
            /> */}
        </div>

        {/* FOOTER */}
        <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
            <p className='text-center text-xs text-gray-500'>&copy; 2024 Contexti.fyi</p>
        </div>
    </div>
  )
}

export default Sidebar