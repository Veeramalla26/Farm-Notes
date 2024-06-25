import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <div className="sidebar">
    <ul>
      <li>
        <NavLink
          to="/dashboard/items"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/animals"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Animals
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/crops"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Crops
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/aquatic"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Aquatic Creatures
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/poultry"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Poultry
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/pets"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Pets
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/machinery"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Machinery
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/infrastructure"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Infrastructure
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/supplies"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Supplies
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Sidebar;
