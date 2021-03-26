import React, { useEffect } from "react";
import axios from "../../axios/axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../store/actions/actions";

import Loader from "react-loader-spinner";
import classes from "./Units.css";
import UnitCard from "../../components/ItemCards/UnitCard";

const Units = (props) => {
  useEffect(() => {
    if (!props.loading && (!props.companies || props.companies.length === 0)) {
      props.getData();
    }
  }, []);

  const unitClick = (idCompany, idUnit) => {
    props.history.push("/company/" + idCompany + "/unit/" + idUnit);
  };

  let list = null;
  if (!props.loading && props.filteredUnits) {
    list = props.filteredUnits.map((item, index) => (
      <div
        className={classes.itemContainer}
        key={index}
        onClick={() => unitClick(item.companyId, item.id)}
      >
        <UnitCard unit={item} showCompany />
      </div>
    ));
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Units</h1>
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
    filteredUnits: state.main.filteredUnits,
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
)(withRouter(Units, axios));
