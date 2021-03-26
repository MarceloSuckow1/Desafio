import React, { useState } from "react";
import classes from "./FiltersModal.css";
import * as constants from "../../constants";

import Modal from "react-modal";
import Select from "react-select";

const FiltersModal = (props) => {
  const [state, setState] = useState({
    filterParams: props.filterParams,
    unitOptions: []
  });

  const selectStatus = (item) => {
    setState({
      ...state,
      filterParams: {
        ...state.filterParams,
        status: item.value,
      },
    });
  };

  const getUnitOptions = (value) => {
    if(value === constants.NONE_SELECTED) return []

    const unitOptions = []
    props.companies.forEach(company => {
      company.units.forEach(unit => {
        unitOptions.push({value: unit.id, label: unit.name})
      })
    })

    return unitOptions
  }

  if(state.unitOptions.length === 0 && state.filterParams.company !== constants.NONE_SELECTED){
    const unitOptions = getUnitOptions(state.filterParams.company)
    setState({
      ...state,
      unitOptions: unitOptions
    })
  }

  const selectCompany = (item) => {
    const unitOptions = getUnitOptions(item.value)
    setState({
      ...state,
      unitOptions: unitOptions,
      filterParams: {
        ...state.filterParams,
        company: item.value,
      },
    });
  };


  const selectUnit = (item) => {
    setState({
      ...state,
      filterParams: {
        ...state.filterParams,
        unit: item.value,
      },
    });
  };

  const statusOptions = [
    { value: constants.IN_OPERATION, label: "Operational" },
    { value: constants.IN_ALERT, label: "Alert" },
    { value: constants.IN_DOWNTIME, label: "Down" },
  ];

  const companyOptions = props.companies.map((company) => ({
    value: company.id,
    label: company.name,
  }));
  
  const filterButtonClicked = () => {
    props.onHide();
    props.onFilter(state.filterParams);
  };

  const clearButtonClicked = () => {
    props.onHide();
    props.onClear();
  };

  return (
    <Modal
      isOpen={true}
      contentLabel="onRequestClose Example"
      onRequestClose={props.onHide}
      className="Modal"
    >
      <div className={classes.container}>
        <h1 className={classes.title}>Filtros</h1>
        <div className={classes.columns}>
          <span className={classes.label}>Status:</span>
          <Select
            options={statusOptions}
            onChange={selectStatus}
            value={
              state.filterParams.status >= 0
                ? statusOptions[state.filterParams.status]
                : null
            }
          />
        </div>

        <div className={classes.columns}>
          <span className={classes.label}>Company:</span>
          <Select
            options={companyOptions}
            onChange={selectCompany}
            value={
              state.filterParams.company !== constants.NONE_SELECTED
                ? companyOptions.find(
                    (item) => item.value === state.filterParams.company
                  )
                : null
            }
          />
        </div>

        <div className={classes.columns}>
          <span className={classes.label}>Unit:</span>
          <Select
            isDisabled={state.filterParams.company === constants.NONE_SELECTED}
            options={state.unitOptions}
            onChange={selectUnit}
            value={
              state.filterParams.unit >= 0
                ? state.unitOptions.find(
                    (item) => item.value === state.filterParams.unit
                  )
                : null
            }
          />
        </div>
        <center>
          <div
            className={classes.buttonContainer}
            onClick={filterButtonClicked}
          >
            Filtrar
          </div>
          <div className={classes.buttonContainer} onClick={clearButtonClicked}>
            Limpar
          </div>
        </center>
      </div>
    </Modal>
  );
};

export default FiltersModal;
