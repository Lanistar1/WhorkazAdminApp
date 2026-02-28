'use client'

import React, { useState, useEffect, useMemo } from 'react';
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


/* =======================
   NAVBAR COMPONENT
======================= */

export const Navbar = () => {
  const pathname = usePathname();
  const { logout, token, user, hasPermission, isSuperAdmin } = useAuth();

  const [activeLink, setActiveLink] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  /* =======================
     NAV ITEMS WITH PERMISSIONS
  ======================= */

  const navItems = useMemo(() => [
    { name: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },

    { name: 'User Management', icon: <JobsIcon />, link: '/user-management', permission: ['user_management.read', 'user_management.manage'] },

    { name: 'Admin Management', icon: <JobsIcon />, link: '/admin', permission: ['admin_management.read', 'admin_management.manage'] },

    { name: 'Category Management', icon: <JobsIcon />, link: '/category', permission: ['category_management.read', 'category_management.manage'] },

    { name: 'Services Management', icon: <JobsIcon />, link: '/services', permission: ['services_management.read', 'services_management.manage'] },

    { name: 'Plans Management', icon: <JobsIcon />, link: '/plans', permission: ['plans_management.read', 'plans_management.manage'] },

    { name: 'Roles Management', icon: <JobsIcon />, link: '/roles', permission: ['role_management.read', 'role_management.manage'] },

    { name: 'KYC & Verification', icon: <JobsIcon />, link: '/kyc-verification', permission: ['kyc_management.read', 'kyc_management.manage'] },

    { name: 'Dispute Center', icon: <CoursesIcon />, link: '/dispute-center', permission: ['dispute_management.read', 'dispute_management.manage'] },

    { name: 'Reports & Analytics', icon: <MessagesIcon />, link: '/reports', permission: ['analytics_reports.read', 'analytics_reports.manage'] },

    { name: 'Payments & Transactions', icon: <PaymentsIcon />, link: '/payments', permission: ['payments_management.read', 'payments_management.manage'] },

    { name: 'Apprenticeship', icon: <CoursesIcon />, link: '/courses', permission: ['courses_management.read', 'courses_management.manage'] },

    { name: 'Settings', icon: <SettingsIcon />, link: '/settings', permission: ['settings_management.read', 'settings_management.manage'] },
  ], []);

  /* =======================
     FILTER BY PERMISSION
  ======================= */

  const filteredNavItems = navItems.filter(item => {
    if (!item.permission) return true;
    if (isSuperAdmin) return true;

    return item.permission.some(permission =>
      hasPermission(permission)
    );
  });

  /* =======================
     ACTIVE LINK TRACKER
  ======================= */

  useEffect(() => {
    const currentPath = pathname || '/dashboard';
    const found = filteredNavItems.find(item => item.link === currentPath);
    setActiveLink(found?.name || 'Dashboard');
  }, [pathname, filteredNavItems]);

  /* =======================
     LOGOUT
  ======================= */

  const confirmLogout = async () => {
    try {
      await fetch(`https://whorkaz.hordun.tech/api/v1/admin/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    } finally {
      setShowLogoutModal(false);
    }
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden sm:flex h-screen flex-col w-[308px] p-4 space-y-4 bg-[#FEFEFF] border-r border-[#DBDBE3] text-zinc-900">

        {/* LOGO */}
        <div className="mb-6">
          <Image
            src="/assets/icons/AppLogo.png"
            alt="Whorkaz Logo"
            width={150}
            height={40}
            className="object-contain"
          />
        </div>

        {/* ADMIN CARD */}
        <div className="p-2 rounded-xl flex items-center border border-[#95959F] justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/images/person3.png"
              alt="Admin"
              width={48}
              height={48}
              className="object-contain"
            />
            <div>
              <div className="text-[14px] font-medium text-[#32323E]">
                ADMIN WORKSPACE
              </div>
              <div className="text-[14px] font-semibold text-[#95959F]">
                {user?.email}
              </div>
              <div className="text-[14px] text-purple-600 ">
                {user?.role?.name}
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-grow space-y-1">
          {filteredNavItems.map(item => {
            const isActive = activeLink === item.name;

            return (
              <a
                key={item.name}
                href={item.link}
                className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors
                  ${isActive
                    ? 'bg-purple-100 border border-[#AA5FBD] text-purple-700'
                    : 'text-[#32323E] hover:bg-gray-200'
                  }`}
              >
                <div className={`${isActive ? 'text-purple-700' : 'text-[#32323E]'}`}>
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-2 text-gray-700 hover:text-red-500 mb-12 p-3 w-full text-left cursor-pointer"
        >
          <LogoutIcon />
          Logout
        </button>
      </aside>

      {/* MOBILE NAV */}
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow sm:hidden z-50">
        <div className="flex justify-around items-center h-16">
          {filteredNavItems.slice(0, 5).map(item => {
            const isActive = activeLink === item.name;

            return (
              <a
                key={item.name}
                href={item.link}
                className={`flex flex-col items-center justify-center p-2 transition-colors text-xs
                  ${isActive ? 'text-purple-700' : 'text-gray-500'}
                `}
              >
                {item.icon}
                <span className="mt-1">{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
};
