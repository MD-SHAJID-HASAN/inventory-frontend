import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Layout,
  Menu,
  Archive,
  Clipboard,
  User,
  SlidersHorizontal,
  CircleDollarSign,
  type LucideIcon,
} from "lucide-react";

import { useAppSelector } from "../hooks/hooks";
import { setisSidebarCollapsed } from "../state/globalSlice";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}) => {
  const location = useLocation();
  const isActive =
    location.pathname === href || (location.pathname === "/" && href === "/dashboard");

  return (
    <Link to={href}>
      <div
        className={`cursor-pointer flex items-center gap-3 py-4 transition-colors 
          ${isCollapsed ? "justify-center px-0" : "justify-start px-8"} 
          ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:text-blue-500 hover:bg-blue-100"}`}
      >
        <Icon className="w-6 h-6" />
        {!isCollapsed && <span className="font-medium">{label}</span>}
      </div>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useAppSelector((state:any) => state.global.isSidebarCollapsed);

  const toggleSidebar = () => {
    dispatch(setisSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarWidthClass = isSidebarCollapsed ? "w-16 mt-[12px] static" : "w-72 mt-[12px] static";

  const links = [
    { href: "/shops", icon: Layout, label: "Shops" },
    { href: "/inventory", icon: Archive, label: "Inventory" },
    { href: "/products", icon: Clipboard, label: "Products" },
    { href: "/users", icon: User, label: "Users" },
    { href: "/settings", icon: SlidersHorizontal, label: "Settings" },
    { href: "/expenses", icon: CircleDollarSign, label: "Expenses" },
  ];

  return (
    <div
      className={` flex flex-col bg-white transition-all duration-300 
       h-full shadow-md z-40 mt-0 ${sidebarWidthClass}`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between gap-3 pt-6 ${
          isSidebarCollapsed ? "px-2" : "px-8"
        }`}
      >
        {/* <div className="logo font-extrabold text-2xl">Q</div> */}
        {!isSidebarCollapsed && <h1 className="font-extrabold text-2xl">InvenTracker</h1>}
        <button
          className={`${isSidebarCollapsed ? 'block m-0' : 'block'} p-4 mt-2 bg-gray-100 rounded-full hover:bg-blue-100`}
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
      

      {/* Navigation Links */}
      <div className="flex-grow mt-8">
        {links.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      {/* Footer */}
      {!isSidebarCollapsed && (
        <p className="text-center text-xs text-gray-500 mt-4 mb-6">
          © 2025 InvenTracker
        </p>
      )}
    </div>
  );
};

export default Sidebar;
