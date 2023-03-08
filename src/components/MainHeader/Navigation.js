import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const v = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {v.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {v.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {v.isLoggedIn && (
          <li>
            <button onClick={v.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
