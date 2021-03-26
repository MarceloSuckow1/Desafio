import React from "react";
import classes from "./Cards.css";
import Card from "../UI/Card/Card";

const UserCard = (props) => {
  return (
    <Card>
      <p className={classes.cardTitle}>{props.user.name}</p>
      <p className={classes.cardText}>
        <b>ID:</b> {props.user.id}
      </p>
      <p className={classes.cardText}>
        <b>Email:</b> {props.user.email}
      </p>
      {props.showUnit && (
        <p className={classes.cardText}>
          <b>Company:</b> {props.user.company.name}
        </p>
      )}
      {props.showUnit && (
        <p className={classes.cardText}>
          <b>Unit:</b> {props.user.unit.name}
        </p>
      )}
    </Card>
  );
};

export default UserCard;
