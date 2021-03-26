/**
 *  Side Drawer Toggle Component
 */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.css';

/**
 *  The Side Drawer Toggle is a button that is fixed on toolbar's left corner on small screens
 *  It is a sequence of 3 horizontal lines and activates the Side Drawer when clicked
 */
const drawerToggle = (props) => (
	<div className={classes.DrawerToggle} onClick={props.clicked}>
		<div></div>
		<div></div>
		<div></div>
	</div>
);

/**
 *	> drawerToggleClicked: function that handles the Side Drawer Toggle onClick
 */
drawerToggle.propTypes = {
	clicked: PropTypes.func.isRequired,
};

export default drawerToggle;
