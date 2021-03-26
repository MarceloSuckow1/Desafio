import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios";

export const getDataSuccess = (response) => {
  let companies = [];

  if (
    response.data &&
    response.data.companies &&
    response.data.companies.length > 0
  ) {
    companies = response.data.companies;
    let assets = response.data.assets;
    let users = response.data.users;
    let units = response.data.units;

    companies.forEach((company, companyIndex) => {
      const companyUnits = []
      if (units && units.length > 0) {
        units.forEach((unit) => {
          const unitAssets = []
          const unitUsers = []

          if (users && users.length > 0) {
             users.forEach((user) => {
              if (unit.companyId === user.companyId && unit.id === user.unitId){
                user.company = company
                user.unit = unit
                unitUsers.push(user)
              }
            });
          }

          if (response.data.assets && response.data.assets.length > 0) {
            assets.forEach((asset) => {
              if( unit.companyId === asset.companyId && unit.id === asset.unitId){
                asset.company = company
                asset.unit = unit
                unitAssets.push(asset)
              }
            });
          }
          unit.assets = unitAssets
          unit.users = unitUsers
          unit.company = company

          companyUnits.push(unit)
        });
      }
      company.units = companyUnits
      companies[companyIndex] = company;
    });
  }

  return {
    companies: companies,
    type: actionTypes.GET_DATA_SUCCESS,
  };
};

export const getDataFail = (error) => {
  return {
    type: actionTypes.GET_DATA_FAIL,
    error: error,
  };
};

export const getDataStart = () => {
  return {
    type: actionTypes.GET_DATA_START,
  };
};

export const showFilters = (show) => {
  return {
    type: actionTypes.SHOW_FILTERS,
    show: show,
  };
};

export const clearFilterParams = () => {
  return {
    type: actionTypes.CLEAR_FILTER_PARAMS,
  };
};

export const filter = (filterParams) => {
  return {
    type: actionTypes.FILTER,
    filterParams: filterParams,
  };
};

export const getData = () => {
  return (dispatch) => {
    dispatch(getDataStart());
    axios
      .get("/db")
      .then((response) => {
        dispatch(getDataSuccess(response));
      })
      .catch((error) => {
        dispatch(getDataFail(error));
      });
  };
};
