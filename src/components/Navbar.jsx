import React, { useState } from "react";
import "../navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { GiKnifeFork } from "react-icons/gi";
import styled from "styled-components";

const Navbar = () => {
  const [Mobile, setMobile] = useState(false);

  return (
    <>
      <nav className="navbar">
        <h3 className="logo">
          <GiKnifeFork />
          <Logo to={"/"}>deliciouss</Logo>
        </h3>
        <div className="nav-elements">
          <ul
            className={Mobile ? "nav-links-mobile" : "nav-links"}
            onClick={() => setMobile(false)}
          >
            <Link to="/nutrition">
              <li>Nutrition</li>
            </Link>
            <Link to="/menu">
              <li>Menu</li>
            </Link>
            <Link to="/shopping-list">
              <li>Shopping List</li>
            </Link>
          </ul>
        </div>

        <button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};
export default Navbar;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  font-family: "Lobster Two", cursive !important;
`;
