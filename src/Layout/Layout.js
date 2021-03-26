import React from "react";
import { connect } from "react-redux";

import classes from "./Layout.css";
import SideBar from "../components/Navigation/SideBar/SideBar";

const Layout = (props) => {
  let content = null;
  content = (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.sideBar}>
            <SideBar />
        </div>
        <div className={classes.main}>
            {props.children}
        </div>
      </div>
    </React.Fragment>
  );

  return content;
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Layout);
