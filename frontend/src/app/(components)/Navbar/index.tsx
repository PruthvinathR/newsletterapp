"use client";

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsAuthenticated, setisDarkMode, setIsSidebarCollapsed, setIsSignupMode, setUser } from '@/app/state';
import { Bell, Menu, Moon, Settings, Sun, User } from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'

const Navbar = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(
        (state) => state.global.user
    );

    const [showLogout, setShowLogout] = useState(false);

    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
    );

    const isDarkMode = useAppSelector(
        (state) => state.global.isDarkMode
    );

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    };

    const toggleDarkMode = () => {
        dispatch(setisDarkMode(!isDarkMode));
    }

    const handleLogout = () => {
        setShowLogout(!showLogout)
        // Clear Redux storage
        dispatch(setIsSidebarCollapsed(false));
        dispatch(setisDarkMode(false));
        dispatch(setIsSignupMode(false));
        dispatch(setIsAuthenticated(false));
        dispatch(setUser({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            organization: '',
        }));
    }

  return (
    <div className="flex justify-between items-center w-full mb-7">
        {/* LEFT SIDE */}
        <div className='flex justify-between items-center gap-5'>
            <button className='px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={toggleSidebar}>
                <Menu className='w-4 h-4 '/>
            </button>
        
            <div className='relative' hidden={true}>
                <input 
                    type='search' 
                    placeholder='Start type to search' 
                    className='pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500'
                />
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Bell className='text-gray-500' size={20}></Bell>
                </div>
            </div>
        </div>
        {/* RIGHT SIDE */}

        <div className='flex justify-between items-center gap-5'>
            <div className='hidden md:flex justify-between items-center gap-5'>
                <div>
                    <button onClick={toggleDarkMode} hidden={true}>
                        {isDarkMode ? 
                            (<Sun className='cursor-pointer text-gray-500' size={24}/>): 
                            (<Moon className='cursor-pointer text-gray-500' size={24}/>)}
                        
                    </button>
                </div>
                <div className='relative' hidden={true}>
                    <Bell className='cursor-pointer text-gray-500' size={24}></Bell>
                    <span className='absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full'>
                        3
                    </span>                    
                </div>
                <hr className='w-0 h-7 border border-solid border-l border-gray-300 mx-3'></hr>
                <div className='flex items-center gap-3 cursor-pointer'>
                    <div className='w-9 h-9'>
                        <User className='w-full h-full text-gray-500' />
                    </div>
                    <span className='font-semibold'>{user && user.firstName}</span>
                </div>
            </div>
            
            <div className="relative">
                <Settings
                    className='cursor-pointer text-gray-500'
                    size={24}
                    onClick={() => setShowLogout(!showLogout)}
                />
                {showLogout && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>

    </div>
  )
}

export default Navbar