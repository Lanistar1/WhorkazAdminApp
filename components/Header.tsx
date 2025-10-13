
import React from "react";
import { Bell, MessageSquare, LogOutIcon } from "lucide-react";

interface HeaderProps {
  title: string; // dynamic prop for the heading text
}

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

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#FEFEFF] border-b border-[#DBDBE3] shadow-sm">
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="flex items-center space-x-4">
        <Bell className="h-5 w-5 text-gray-500 dark:text-gray-500" />
        <MessageSquare className="hidden md:flex h-5 w-5 text-gray-500 dark:text-gray-500" />
        <LogOutIcon className=" md:hidden h-5 w-5 text-gray-500 dark:text-gray-500"/>
      </div>
    </header>
  );
};

export default Header;
