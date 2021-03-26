import React, { useEffect } from "react";
import axios from "../../axios/axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AssetCard from "../../components/ItemCards/AssetCard";

import * as actions from "../../store/actions/actions";

import Loader from "react-loader-spinner";
import classes from "./Assets.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FiltersModal from "../../components/FiltersModal/FiltersModal";

const Assets = (props) => {
  useEffect(() => {
    if (!props.loading && (!props.companies || props.companies.length === 0)) {
      props.getData();
    }
  }, []);

  let list = null;
  if (!props.loading && props.filteredAssets) {
    list = props.filteredAssets.map((item, index) => (
      <div className={classes.itemContainer} key={index}>
        <AssetCard asset={item} showCompany showUnit />
      </div>
    ));
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <h1 className={classes.title}>Assets</h1>
        <div
          className={classes.buttonContainer}
          onClick={() => props.showFilters(true)}
        >
          <FontAwesomeIcon icon={faFilter} /> Filtrar Resultados
        </div>
        {props.loading && (
          <Loader type="TailSpin" color="#0d47a1" height={100} width={100} />
        )}
        {list}
      </div>
      {props.showFiltersModal && (
        <FiltersModal
          onHide={() => props.showFilters(false)}
          onFilter={props.filter}
          onClear={props.clearFilterParams}
          filterParams={props.filterParams}
          companies={props.companies}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    companies: state.main.companies,
    filteredAssets: state.main.filteredAssets,
    loading: state.main.loading,
    showFiltersModal: state.main.showFilters,
    filterParams: state.main.filterParams,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(actions.getData()),
    showFilters: (show) => dispatch(actions.showFilters(show)),
    filter: (filters) => dispatch(actions.filter(filters)),
    clearFilterParams: (filters) => dispatch(actions.clearFilterParams()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Assets, axios));
