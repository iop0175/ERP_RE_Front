import axios from "axios";
import React, { useEffect, useState } from "react";
import AllList from "./Contenets/AllList";
import Dashboard from "./dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";


const Main: React.FC = () => {

    return (
        <div className="mainContent">
            <Routes>
                <Route path="all" element={<AllList />} />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </div>
    )
}
export default Main;