
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
        {/* <Navbar></Navbar> */}
        <div className="p-8">
            <Outlet></Outlet>
        </div>
    </div>
  );
}

export default Main;
