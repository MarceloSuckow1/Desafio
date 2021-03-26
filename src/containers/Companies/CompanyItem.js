import React, { useState, useEffect } from "react";
import * as actions from "../../store/actions/actions";
import axios from "../../axios/axios";
import { connect } from "react-redux";
import { withRouter, useParams } from "react-router-dom";

import Loader from "react-loader-spinner";
import classes from "./CompanyItem.css";

import UserCard from "../../components/ItemCards/UserCard";
import AssetCard from "../../components/ItemCards/AssetCard";
import UnitCard from "../../components/ItemCards/UnitCard";

const CompanyItem = (props) => {
  const [company, setCompany] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!props.loading && (!props.companies || props.companies.length === 0)) {
      props.getData();
    }
  }, []);

  const unitClick = (unitId) => {
    props.history.push('/company/'+id+'/unit/'+unitId)
  }

  if (!company) {
    if (props.companies) {
      props.companies.forEach((item) => {
        if (item.id + "" === id + "") {
          setCompany(item);
        }
      });
    }
  }

  let units = null;
  let users = null;
  let assets = null;
  let usersArray = [];
  let assetsArray = [];

  if (company) {
    units = company.units.map((item, index) => {
      usersArray = [...usersArray, ...item.users];
      assetsArray = [...assetsArray, ...item.assets];
      return (
        <div
          className={[classes.itemContainer, classes.clickableContainer].join(
            " "
          )}
          key={index} onClick={() => unitClick(item.id)}
        >
          <UnitCard unit={item}/>
        </div>
      );
    });

    users = usersArray.map((item, index) => {
      return (
        <div className={classes.itemContainer} key={index}>
          <UserCard user={item} key={index} showUnit />
        </div>
      );
    });

    assets = assetsArray.map((item, index) => {
      return (
        <div className={classes.itemContainer} key={index}>
          <AssetCard asset={item} showUnit  />
        </div>
      );
    });
  }

  return !company ? (
    props.loading && (
      <center><Loader type="TailSpin" color="#0d47a1" height={100} width={100} /></center>
    )
  ) : (
    <React.Fragment>
      <div className={classes.container}>
        <h1 className={classes.title}>{company.name} </h1>
        <h1 className={classes.subtitle}>Units </h1>
        {units}
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
)(withRouter(CompanyItem, axios));
