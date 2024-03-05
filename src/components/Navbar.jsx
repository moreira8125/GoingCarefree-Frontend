import React from "react";
import logo from "/images/logoGoingCarefree.png";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className=" bg-navbar_color flex w-full sticky top-0 justify-between flex-wrap pt-4"
      style={{ zIndex: "1000" }}
    >
      <Link to={"/"} className="flex justify-center items-center">
        <img src={logo} className="w-48 ml-8 md:w-64 lg:w-96" />
      </Link>

      <div className=" hidden xl:flex xl:pt-4 xl:mr-24 xl:gap-28 xl:mt-4">
        <NavLink
          className="text-navlink_color font-bold text-2xl mb-4 hover:text-white"
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className="text-navlink_color font-bold text-2xl mb-4 hover:text-white"
          to={"/destinations"}
        >
          Destinations
        </NavLink>
        <NavLink
          className="text-navlink_color font-bold text-2xl mb-4 hover:text-white"
          to={"/reviews"}
        >
          Reviews
        </NavLink>
        <NavLink
          className="text-navlink_color font-bold text-2xl mb-4 hover:text-white"
          to={"/contacts"}
        >
          Contacts
        </NavLink>
      </div>

      <div className=" xl:hidden text-xl text-white flex  w-1/6 items-center justify-center  ">
        <button onClick={toggleNavbar}>
          {isOpen ? (
            <i className="fi fi-rs-x"></i>
          ) : (
            <i className="fi fi-rr-menu-burger"></i>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col items-center basis-full pt-4 bg-navbar_color">
          <NavLink
            className="text-navlink_color font-bold text-2xl mb-4 hover:text-white"
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className="text-navlink_color font-bold text-2xl mb-4 hover:text-white"
            to={"/destinations"}
          >
            Destinations
          </NavLink>
          <NavLink
            className="text-navlink_color font-bold text-2xl mb-4 hover:text-white"
            to={"/reviews"}
          >
            Reviews
          </NavLink>
          <NavLink
            className="text-navlink_color font-bold text-2xl mb-4 hover:text-white"
            to={"/contacts"}
          >
            Contacts
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Navbar;
