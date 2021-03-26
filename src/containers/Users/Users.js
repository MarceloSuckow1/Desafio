import React, { useEffect } from "react";
import axios from "../../axios/axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../store/actions/actions";

import Loader from "react-loader-spinner";
import classes from "./Users.css";
import UserCard from "../../components/ItemCards/UserCard";

const Users = (props) => {
  useEffect(() => {
    if (!props.loading && (!props.companies || props.companies.length === 0)) {
      props.getData();
    }
  }, []);


  let list = null;
  if (!props.loading && props.filteredUsers) {
    list = props.filteredUsers.map((item, index) => (
      <div
        className={classes.itemContainer}
        key={index}
      >
        <UserCard user={item} showCompany showUnit />
      </div>
    ));
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Users</h1>
      {props.loading && (
        <Loader type="TailSpin" color="#0d47a1" height={100} width={100} />
      )}
      {list}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    companies: state.main.companies,
    loading: state.main.loading,
    filteredUsers: state.main.filteredUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(actions.getData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Users, axios));
