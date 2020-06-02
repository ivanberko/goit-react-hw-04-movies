import React from "./node_modules/react";
import { NavLink, withRouter } from "./node_modules/react-router-dom";
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
