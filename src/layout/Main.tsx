// Main.tsx
import HeaderU from "@/components/Layout/HeaderU";
import SidebarU from "@/components/Layout/SidebarU";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Main() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarU
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onMouseEnter={() => setSidebarCollapsed(false)} // expand
        onMouseLeave={() => setSidebarCollapsed(true)}
      />

      {/* Main wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ✅ Only shift the header */}
        <div
          className="transition-[all] duration-300 ease-in-out z-50"
          style={{
            
            position: "fixed",
            left: sidebarCollapsed ? "5rem" : "18rem",
            right: 0,
            top: 0,
          }}
        >
          <HeaderU
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* ✅ Content stays full width (sidebar overlaps if expanded) */}
        <div className="p-8 ml-20 mt-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
