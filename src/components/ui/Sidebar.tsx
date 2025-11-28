import '@/styles/css/ui/Sidebar.css'
import Approval from '@/styles/SVG/Approval';
import Calendar from '@/styles/SVG/Calendar';
import Gra from '@/styles/SVG/Home';
import Mail from '@/styles/SVG/Mail';
import Setting from '@/styles/SVG/Setting';
import Time from '@/styles/SVG/Back'
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
const Sidebar: React.FC = ({ }) => {
    const [page, setPage] = useState("");
    const location = useLocation();


    useEffect(() => {
        setPage(location.pathname.split("/")[1]);
    }, [location.pathname]);

    const navigate = useNavigate();
    const items = [
        { key: "main", icon: <Gra /> },
        { key: "calendar", icon: <Calendar /> },
        { key: "mail", icon: <Mail /> },
        { key: "approval", icon: <Approval /> },
        { key: "setting", icon: <Setting /> },
    ];
    return (
        <div className="sidebar">
            <div className="sidebar-item"><Time /></div>
            {items.map(item => (
                <div
                    key={item.key}
                    style={page == item.key ? { backgroundColor: "#beff54" } : {}}
                    className="sidebar-item"
                    onClick={() => navigate(item.key)}
                >
                    {item.icon}
                </div>
            ))}
        </div>
    )
}
export default Sidebar;