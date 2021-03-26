/**
 *  Backdrop Component: a semi-transparent black layer that overlays the application
 */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.css';

const backdrop = (props) => (props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null);

/**
 *  > clicked: function that handles the backdrop's onClick action
 */
backdrop.propTypes = {
	clicked: PropTypes.func.isRequired,
};

export default backdrop;
