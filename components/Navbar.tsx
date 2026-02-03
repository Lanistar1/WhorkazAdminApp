'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/context/AuthContext';
import LogoutModal from './LogoutModal';

// Using inline SVG for icons to keep the component self-contained.
const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9"></rect>
        <rect x="14" y="3" width="7" height="5"></rect>
        <rect x="14" y="12" width="7" height="9"></rect>
        <rect x="3" y="16" width="7" height="5"></rect>
    </svg>
);

const JobsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="2" rx="1" ry="1"></rect>
    </svg>
);

const DiscoverIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const CoursesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20h-4"></path>
        <path d="M12 12V6"></path>
    </svg>
);

const MessagesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const PaymentsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 1.51-1c-.02-.27-.03-.54-.03-.81a1.65 1.65 0 0 0 .33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Door / screen outline */}
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    {/* Logout arrow */}
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);


export const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');
    const pathname = usePathname();

    const { logout, token } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Call your backend logout endpoint
    fetch(`https://whorkaz.hordun.tech/api/v1/admin/auth/logout`, {
      method: 'POST', // or GET, depending on backend
      headers: {
        Authorization: `Bearer ${token}`, // make sure token is available
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        logout(); // clear local state and redirect
        toast.success("Logged out successfully");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        toast.error("Failed to log out");
      })
      .finally(() => {
        setShowLogoutModal(false);
      });
  };

    useEffect(() => {
        const currentPath = pathname || '/dashboard';
        const newActiveLink = navItems.find(item => item.link === currentPath)?.name.toLowerCase().replace(' ', '') ||
            // exploreItems.find(item => item.link === currentPath)?.name.toLowerCase().replace(' ', '') ||
            'dashboard';
        setActiveLink(newActiveLink);
    }, [pathname]);

    const navItems = [
        { name: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
        { name: 'User Management', icon: <JobsIcon />, link: '/user-management' },
        { name: 'Admin Management', icon: <JobsIcon />, link: '/admin' },
        { name: 'Category Management', icon: <JobsIcon />, link: '/category' },
        { name: 'Services Management', icon: <JobsIcon />, link: '/services' },
        { name: 'KYC & Verification', icon: <DiscoverIcon />, link: '/kyc-verification' },
        { name: 'Dispute Center', icon: <CoursesIcon />, link: '/dispute-center' },
        { name: 'Reports & Analytics', icon: <MessagesIcon />, link: '/reports' },
        { name: 'Payments & Transactions', icon: <PaymentsIcon />, link: '/payments' },
        { name: 'Apprenticeship', icon: <PaymentsIcon />, link: '/courses' },
        { name: 'Settings', icon: <SettingsIcon />, link: '/settings' },
    ];

    // const exploreItems = [
        
    // ];

    return (
        <>
            {/* Desktop Sidebar (visible on screens larger than 'sm') */}
            <aside className="hidden sm:flex h-screen flex-col w-[308px] p-4 space-y-4 bg-[#FEFEFF] border-r-1 border-solid border-[#DBDBE3] text-zinc-900">
                <div className="flex items-center space-x-2 mb-6">
                    <Image
                        src="/assets/icons/AppLogo.png"
                        alt="Whorkaz Logo"
                        width={150}
                        height={14}
                        className="object-contain"
                    />
                </div>

                {/* Client Card */}
                <div className="p-2 rounded-xl flex items-center border border-[#95959F] justify-between shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/assets/images/person3.png"
                        alt="Whorkaz Logo"
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                        <div>
                            <div className="text-[14px] font-medium text-[#32323E]">ADMIN WORKSPACE</div>
                            <div className="text-[16px] font-semibold text-[#95959F]">Jason Alexander</div>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow space-y-1">
                    {navItems.map((item) => (
                        <a 
                            key={item.name} 
                            href={item.link} 
                            onClick={() => setActiveLink(item.name.toLowerCase().replace(' ', ''))}
                            className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors
                                ${activeLink === item.name.toLowerCase().replace(' ', '') 
                                    ? 'bg-purple-100 border border-[#AA5FBD] text-purple-700' 
                                    : 'hover:bg-gray-200'}`}
                        >
                            <div className={`
                                ${activeLink === item.name.toLowerCase().replace(' ', '') 
                                    ? 'text-purple-700 text-[18px] font-semibold' 
                                    : 'text-[#32323E] text-[18px] font-semibold'}`}
                            >
                                {item.icon}
                            </div>
                            <span>{item.name}</span>
                        </a>
                    ))}
                </nav>
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-500 mb-12 p-3 w-full text-left cursor-pointer"
                    >
                    <LogoutIcon />
                    Logout
                </button>
            </aside>

            {/* Mobile Bottom Tab Bar (visible on screens smaller than 'sm') */}
            <nav className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)] sm:hidden z-50">
                <div className="flex justify-around items-center h-16">
                    {[
                        { name: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
                        { name: 'Disbute', icon: <JobsIcon />, link: '/dispute-center' },
                        { name: 'Payment', icon: <PaymentsIcon />, link: '/payments' },
                        { name: 'Apprenticeship', icon: <CoursesIcon />, link: '/courses' },
                        { name: 'Settings', icon: <SettingsIcon />, link: '/settings' },
                    ].map((item) => (
                        <a 
                            key={item.name} 
                            href={item.link} 
                            onClick={() => setActiveLink(item.name.toLowerCase().replace(' ', ''))}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors
                                ${activeLink === item.name.toLowerCase().replace(' ', '') 
                                    ? 'text-purple-700' 
                                    : 'text-zinc-900'}`}
                        >
                            <div className={`
                                ${activeLink === item.name.toLowerCase().replace(' ', '') 
                                    ? 'text-purple-700' 
                                    : 'text-gray-500'}`}
                            >
                                {item.icon}
                            </div>
                            <span className="text-xs mt-1">{item.name}</span>
                        </a>
                    ))}
                </div>
            </nav>

            {/* Logout Confirmation Modal */}
            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />
        </>
    );
};