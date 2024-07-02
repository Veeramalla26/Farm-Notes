import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaDog,
  FaFish,
  FaCrow,
  FaCat,
  FaBuilding,
  FaCloud,
  FaPagelines,
} from "react-icons/fa";
import { GiWheat } from "react-icons/gi";

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
          to="/dashboard/weather"
          activeClassName="active"
          className="sidebar-link"
        >
          <FaCloud className="sidebar-icon" /> Weather
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
          <GiWheat className="sidebar-icon" /> Crops
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
          <FaPagelines className="sidebar-icon" /> Plants
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/infrastructure"
          activeClassName="active"
          className="sidebar-link"
        >
          <FaBuilding className="sidebar-icon" />
          Others
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Sidebar;
