import React, { useState } from "react";
import Card from "../UI/Card/Card";

import classes from "./Cards.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import Modal from "react-modal";

const toMinSecs = (seconds) => {
  const min = parseInt(seconds / 60);
  let secs = parseInt(seconds - 60 * min);

  if (secs < 10) secs = "0" + secs;

  return min + ":" + secs + " min";
};

const parseDateTime = (datetime) => {
  const datetimeStrings = datetime.split("T");
  const date = datetimeStrings[0].split("-");
  const timeString = datetimeStrings[1].split("Z");

  return date[2] + "/" + date[1] + "/" + date[0] + "  " + timeString[0];
};

const AssetCard = (props) => {
  const asset = props.asset;
  const [showMetrics, setShowMetrics] = useState(false);
  const [showSpecifications, setShowSpecifications] = useState(false);

  let statusComponent = null;

  if (asset.status) {
    let style = null;
    let status = null;
    let icon = null;

    if (asset.status === "inOperation") {
      style = classes.inOperation;
      status = "Operational";
      icon = <FontAwesomeIcon icon={faCheckCircle} color="green" />;
    } else if (asset.status === "inAlert") {
      style = classes.inAlert;
      status = "Alert";
      icon = (
        <FontAwesomeIcon icon={faExclamationTriangle} color="darkgoldenrod" />
      );
    } else if (asset.status === "inDowntime") {
      style = classes.inDowntime;
      status = "Down";
      icon = <FontAwesomeIcon icon={faTimesCircle} color="red" />;
    }
    statusComponent = (
      <p className={classes.cardText}>
        <b>Status: </b>
        <span className={style}>
          {icon} {status}
        </span>
      </p>
    );
  }

  let sensorsComponents = null

  if(asset.sensors){
    sensorsComponents = <div>
      <span className={classes.cardText}><b>Sensors:</b></span>
      {asset.sensors.map(sensor => {
        return <span className={classes.cardText}>{sensor}</span>
      })}
    </div>
  }

  return (
    <Card>
      <div className={classes.imageContainer}>
        <img src={asset.image} className={classes.imageContainer} alt="" />
      </div>
      <div className={classes.container}>
        <p className={classes.cardTitle}>{asset.name}</p>
        <center>
          {asset.model && (
            <span className={classes.cardText}>
              <b>Model:</b> {asset.model}
            </span>
          )}
          {asset.healthscore && (
            <span className={classes.cardText}>
              <b>Healthscore:</b> {asset.healthscore}
            </span>
          )}
        </center>
        {statusComponent}
        {props.showCompany && (
          <p className={classes.cardText}>
            <b>Company: </b>
            {asset.company.name}
          </p>
        )}
        {props.showUnit && (
          <p className={classes.cardText}>
            <b>Unit: </b>
            {asset.unit.name}
          </p>
        )}
        {sensorsComponents}
        <center>
          <div
            className={classes.buttonContainer}
            onClick={() => setShowMetrics(true)}
          >
            Show Metrics
          </div>

          <div
            className={classes.buttonContainer}
            onClick={() => setShowSpecifications(true)}
          >
            Show Specifications
          </div>
        </center>
      </div>

      {showMetrics && (
        <Modal
          isOpen={true}
          onRequestClose={() => setShowMetrics(false)}
          className="Modal"
        >
          <div className={classes.modalContainer}>
            <p className={classes.cardText}>
              <b>Total Collects Uptime: </b>{" "}
              {toMinSecs(parseFloat(asset.metrics.totalCollectsUptime))}
            </p>
            <p className={classes.cardText}>
              <b>Total Uptime: </b>{" "}
              {toMinSecs(parseFloat(asset.metrics.totalUptime))}
            </p>
            <p className={classes.cardText}>
              <b>Last Uptime: </b> {parseDateTime(asset.metrics.lastUptimeAt)}
            </p>
          </div>
        </Modal>
      )}

      {showSpecifications && (
        <Modal
          isOpen={true}
          onRequestClose={() => setShowSpecifications(false)}
          className="Modal"
        >
          <div className={classes.modalContainer}>
            {asset.specifications.maxTemp ? (
              <p className={classes.cardText}>
                <b>Maximum Temperature: </b>
                {asset.specifications.maxTemp}
              </p>
            ): null}
            {asset.specifications.rpm ?  (
              <p className={classes.cardText}>
                <b>Rotations per Minute: </b> {asset.specifications.rpm}
              </p>
            ): null}
            {asset.specifications.power  ? (
              <p className={classes.cardText}>
                <b>Power: </b> {asset.specifications.power}
              </p>
            ): null}
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default AssetCard;
