import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faWifi,
  faShower,
  faTv,
  faAirConditioner,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

export const useIconos = () => {
  const locationDot = <FontAwesomeIcon icon={faLocationDot} />;
  const wifi = <FontAwesomeIcon icon={faWifi} />;
  const shower = <FontAwesomeIcon icon={faShower} />;
  const tv = <FontAwesomeIcon icon={faTv} />;
  const airConditioner = <FontAwesomeIcon icon={faAirConditioner} />;
  console.log(faWifi);
  return {
    faWifi,
  };
};
