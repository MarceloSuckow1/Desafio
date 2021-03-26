import React from "react";

import classes from './Cards.css'
import Card from '../UI/Card/Card'

const UnitCard = (props) => {
  return (
    <Card>
      <p className={classes.cardTitle}>{props.unit.name}</p>
      <p className={classes.cardText}>
        <b>ID:</b> {props.unit.id}
      </p>
      {props.showCompany && <p className={classes.cardText}>
        <b>Company:</b> {props.unit.company.name}
      </p>}
    </Card>
  );
};

export default UnitCard;
