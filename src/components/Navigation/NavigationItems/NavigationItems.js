import React from "react";
import { connect } from "react-redux";

import classes from "./NavigationItems.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigation = [
  { label: "Assets", link: "/" },
  { label: "Empresas", link: "/companies" },
  { label: "Units", link: "/units" },
  { label: "Users", link: "/users" },
];

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      {navigation.map((item, index) => (
        <NavigationItem link={item.link} key={index} exact>
			{item.label}
		</NavigationItem>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(navigationItems);
