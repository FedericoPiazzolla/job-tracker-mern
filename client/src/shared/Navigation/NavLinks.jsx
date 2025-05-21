import React from "react";
import { NavLink } from "react-router-dom";

import "./style/NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Stats
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/jobs">My Jobs Interview</NavLink>
      </li>
      <li>
        <NavLink to="/jobs/new">New Job Interview</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Authenticate</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
