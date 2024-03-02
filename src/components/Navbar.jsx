import React from "react";
import logo from "/images/logoGoingCarefree.png";
import "../styles/navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navContainer" style={{ zIndex: "1000" }}>
      <Link to={"/"}>
        <img src={logo} />
      </Link>
      <div className="options">
        <NavLink className={"navlink"} to={"/"}>
          Home
        </NavLink>
        <NavLink className={"navlink"} to={"/destinations"}>
          Destinations
        </NavLink>
        <NavLink className={"navlink"} to={"/reviews"}>
          Reviews
        </NavLink>
        <NavLink className={"navlink"} to={"/contacts"}>
          Contacts
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
