import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaDog,
  FaLeaf,
  FaFish,
  FaCrow,
  FaCat,
  FaTractor,
  FaBuilding,
  FaBox,
} from "react-icons/fa"; // Import icons from react-icons

const Sidebar = () => (
  <div className="sidebar">
    <ul>
      <li>
        <NavLink
          to="/dashboard/items"
          activeClassName="active"
          className="sidebar-link"
        >
          <FaHome className="sidebar-icon" /> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/animals"
          activeClassName="active"
          className="sidebar-link"
        >
          <FaDog className="sidebar-icon" /> Animals
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/crops"
          activeClassName="active"
          className="sidebar-link"
        >
          <FaLeaf className="sidebar-icon" /> Crops
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/aquatic"
          activeClassName="active"
          className="sidebar-link"
        >
          <FaFish className="sidebar-icon" /> Aquatic Creatures
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/poultry"
          activeClassName="active"
          className="sidebar-link"
        >
          <FaCrow className="sidebar-icon" /> Poultry
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/pets"
          activeClassName="active"
          className="sidebar-link"
        >
          <FaCat className="sidebar-icon" /> Pets
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/machinery"
          activeClassName="active"
          className="sidebar-link"
        >
          <FaTractor className="sidebar-icon" /> Machinery
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/infrastructure"
          activeClassName="active"
          className="sidebar-link"
        >
          <FaBuilding className="sidebar-icon" /> Infrastructure
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/supplies"
          activeClassName="active"
          className="sidebar-link"
        >
          <FaBox className="sidebar-icon" /> Supplies
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Sidebar;
