import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideBar.css";

const SideBar = (props) => {

  return (
    <div className={classes.sideBar}>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default SideBar;
