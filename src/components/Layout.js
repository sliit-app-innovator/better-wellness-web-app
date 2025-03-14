import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar"; // Ensure the path is correct

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Menu */}
      {/* Main Layout: Sidebar + Page Content */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <tr>
          <td>
            <div className="w-64">
            <Sidebar/>
          </div>
          </td>
          <td>
          <div className="flex-1 p-6">
          <Outlet /> {/* Renders child components dynamically */}
        </div>
          </td>
        </tr>
      </div>
    </div>
  );
};

export default Layout;
