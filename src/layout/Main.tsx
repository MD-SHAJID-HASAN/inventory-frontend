// Main.tsx
import HeaderU from "@/components/Layout/HeaderU";
import SidebarU from "@/components/Layout/SidebarU";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Main() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? "md:block" : ""}`}>
        <SidebarU
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onMouseEnter={() => setSidebarCollapsed(false)} // expand
          onMouseLeave={() => setSidebarCollapsed(true)}
        />
      </div>

      {/* Main wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ✅ Only shift the header */}
        <div
          className={`transition-[all] duration-300 ease-in-out z-50 fixed ${
            sidebarCollapsed ? "sm:left-0 md:left-20" : "left-72"
          } left-0 right-0`}
          style={
            {
              // position: "fixed",
              // left: sidebarCollapsed ? " 5rem" : "18rem",
              // right: 0,
              // top: 0,
            }
          }
        >
          <HeaderU
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        <div className="p-8 md:ml-20 mt-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
