import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ItemList from "../../components/farm-items-display/farm-items-display";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";

const Dashboard = () => (
  <div className="app-container">
    <Sidebar />
    <div className="main-content">
      <Navbar />
      <Routes>
        <Route index element={<Navigate to="items" />} />
        <Route path="items" element={<ItemList />} />
        <Route path="animals" element={<ItemList id="1" key="animals" />} />
        <Route path="crops" element={<ItemList id="2" key="crops" />} />
        <Route path="aquatic" element={<ItemList id="3" key="aquatic" />} />
        <Route path="poultry" element={<ItemList id="4" key="poultry" />} />
        <Route path="pets" element={<ItemList id="5" key="pets" />} />
        <Route path="machinery" element={<ItemList id="6" key="machinery" />} />
        <Route
          path="infrastructure"
          element={<ItemList id="7" key="infrastructure" />}
        />
        <Route path="supplies" element={<ItemList id="8" key="supplies" />} />
        {/* Add routes for other categories similarly */}
      </Routes>
    </div>
  </div>
);

export default Dashboard;
