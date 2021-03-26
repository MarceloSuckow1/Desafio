import * as actionTypes from "../actions/actionTypes";
import * as constants from '../../constants'


const initialFilterParams = {
  status: constants.NONE_SELECTED,
  company: constants.NONE_SELECTED,
  unit: constants.NONE_SELECTED
}

const initialState = {
  companies: [],
  filteredUnits: [],
  filteredUsers: [],
  filteredAssets: [],
  loading: false,
  error: null,
  showFilters: false,
  filterParams: {...initialFilterParams}
};

const getDataStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const getDataSuccess = (state, action) => {
  return {
    ...state,
    companies: action.companies,
    filteredAssets: getFilteredAssets(joinAssets(action.companies), initialFilterParams),
    filteredUnits: joinUnits(action.companies),
    filteredUsers: joinUsers(action.companies),
    loading: false,
    error: null,
  };
};

const getDataFail = (state, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error,
  };
};

const showFilters = (state, action) => {
  return {
    ...state,
    showFilters: action.show,
  };
};

const clearFilterParams = (state, action) => {
  return {
    ...state,
    filterParams: {...initialFilterParams},
    filteredAssets: (joinAssets([...state.companies]))
  };
}

const filter = (state, action) => {
  return {
    ...state,
    filteredAssets: getFilteredAssets(joinAssets(state.companies), action.filterParams),
    filterParams: action.filterParams
  };
};

const joinAssets = (companies) => {
  let assets = []
  companies.forEach(company => {
    company.units.forEach(unit =>{
      assets = [...assets, ...unit.assets]
    })
  })

  return assets
}

const joinUnits = (companies) => {
  let units = []
  companies.forEach(company => {
    units = [...units, ...company.units]
  })

  return units
}

const joinUsers = (companies) => {
  let users = []
  companies.forEach(company => {
    company.units.forEach(unit =>{
      users = [...users, ...unit.users]
    })
  })

  return users
}

const getFilteredAssets = (assets, params) => {
  assets = filterStatus(assets,params)

  if(params.company !== constants.NONE_SELECTED){
    assets = assets.filter(asset => (asset.company.id === params.company))
  }

  if(params.unit !== constants.NONE_SELECTED){
    assets = assets.filter(asset => (asset.unit.id === params.unit))
  }


  return assets
}

const filterStatus = (assets, params) => {
  if(params.status === constants.IN_OPERATION){
    assets = assets.filter(item => (
      item.status === "inOperation"
    ))
  }

  else if(params.status === constants.IN_ALERT){
    assets = assets.filter(item => (
      item.status === "inAlert"
    ))
  }

  else if(params.status === constants.IN_DOWNTIME){
    assets = assets.filter(item => (
      item.status === "inDowntime"
    ))
  }


  return assets
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA_START:
      return getDataStart(state, action);
    case actionTypes.GET_DATA_SUCCESS:
      return getDataSuccess(state, action);
    case actionTypes.GET_DATA_FAIL:
      return getDataFail(state, action);
    case actionTypes.SHOW_FILTERS:
      return showFilters(state, action);
    case actionTypes.FILTER:
      return filter(state, action);
    case actionTypes.CLEAR_FILTER_PARAMS:
      return clearFilterParams(state, action);
    default:
      return state;
  }
};

export default reducer;
