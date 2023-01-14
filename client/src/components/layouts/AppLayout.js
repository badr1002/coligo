import { Outlet } from "react-router-dom";
import NavbarLayout from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from 'react';

const AppLayout = ({ onLogOut, currentUser }) => {
    const [sidebarStatus, statSidebarStatus] = useState(false);
    const capsuleSidebar = (sidebarStatus) => {
        statSidebarStatus(sidebarStatus);
    }

    return <div style={{
        padding: `0px 0px 0px ${sidebarStatus ? '320px' : '90px'}`
    }}>
        <Sidebar onCapsuleSidebar={capsuleSidebar} sidebarStatus={sidebarStatus} />
        <NavbarLayout onCapsuleSidebar={capsuleSidebar} LogOut={onLogOut} currentUser={currentUser} />
        <Outlet />
    </div>;
};

export default AppLayout;