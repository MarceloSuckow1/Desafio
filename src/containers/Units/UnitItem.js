import React, { useState, useEffect } from "react";
import * as actions from "../../store/actions/actions";
import axios from "../../axios/axios";
import { connect } from "react-redux";
import { withRouter, useParams } from "react-router-dom";

import Loader from "react-loader-spinner";
import classes from "./UnitItem.css";

import UserCard from "../../components/ItemCards/UserCard";
import AssetCard from "../../components/ItemCards/AssetCard";

const UnitItem = (props) => {
  const [unit, setUnit] = useState(null);
  const { idCompany } = useParams();
  const { idUnit } = useParams();

  useEffect(() => {
    if (!props.loading && (!props.companies || props.companies.length === 0)) {
      props.getData();
    }
  }, []);

  if (!unit && props.companies) {
    props.companies.forEach((company) => {
      if (company.id + "" === idCompany + "") {
        company.units.forEach((item) => {
          if (idUnit + "" === item.id + "") {
            setUnit(item);
          }
        });
      }
    });
  }

  let users = null;
  let assets = null;

  if (unit) {
    users = unit.users.map((item, index) => {
      return (
        <div className={classes.itemContainer} key={index}>
          <UserCard user={item} key={index} />
        </div>
      );
    });

    assets = unit.assets.map((item, index) => {
      return (
        <div className={classes.itemContainer} key={index}>
          <AssetCard asset={item}  />
        </div>
      );
    });
  }

  return !unit ? (
    props.loading && (
      <center>
        <Loader type="TailSpin" color="#0d47a1" height={100} width={100} />
      </center>
    )
  ) : (
    <React.Fragment>
      <div className={classes.container}>
        <h1 className={classes.title}>{unit.name} </h1>
        <h1 className={classes.subtitle}><b>{unit.company.name}</b></h1>
        <h1 className={classes.subtitle}>Users </h1>
        {users}
        <h1 className={classes.subtitle}>Assets </h1>
        {assets}
      </div>
    </React.Fragment>
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
)(withRouter(UnitItem, axios));
