import HeaderU from "@/components/Layout/HeaderU";
import SidebarU from "@/components/Layout/SidebarU";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Main() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const [test, setTest] = useState(5);

  return (
    <div>
      {/* <Sidebar></Sidebar> */}
      {/* <Navbar></Navbar> */}
      <div className="flex">
        <SidebarU
          collapsed={sidebarCollapsed}
          onToggle={() => {
            setSidebarCollapsed(!sidebarCollapsed);
          }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        ></SidebarU>
        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderU
            collapsed={sidebarCollapsed}
            onToggle={() => {
              setSidebarCollapsed(!sidebarCollapsed);
            }}
          ></HeaderU>
          <div className="p-8">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
