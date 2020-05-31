import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { navApp, navLink, navItem, activeLink } from "./Nav.module.css";

const Nav = () => (
  <ul className={navApp}>
    <li className={navItem}>
      <NavLink exact className={navLink} activeClassName={activeLink} to="/">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink className={navLink} activeClassName={activeLink} to="/movies">
        Movies
      </NavLink>
    </li>
  </ul>
);

export default withRouter(Nav);
