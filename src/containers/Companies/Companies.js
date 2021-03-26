import React, { useEffect } from "react";
import axios from "../../axios/axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from "../../components/UI/Card/Card";

import * as actions from "../../store/actions/actions";

import Loader from "react-loader-spinner";
import classes from "./Companies.css";

const Companies = (props) => {
  useEffect(() => {
    if (!props.loading && (!props.companies || props.companies.length === 0)) {
      props.getData();
    }
  }, []);

  const companyClick = (id) => {
    props.history.push('/company/'+id)
  }

  let list = null;
  if (!props.loading && props.companies) {
    list = props.companies.map((item, index) => (
      <div className={classes.itemContainer} key={index} onClick={() => companyClick(item.id)}>
        <Card>
          <p className={classes.companyName}>{item.name}</p>
          ID: {item.id}
        </Card>
      </div>
    ));
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Companies</h1>
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
)(withRouter(Companies, axios));
