import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import logophone from "../../img/logophone.png";
import styles from "../module/Logo.module.css";

const Logo = () => {
  const navigate = useNavigate();
  const homeRedirect = () => {
    navigate("/");
  };

  return (
    <div className={styles.contendeor}>
      <img
        src={logo}
        className={styles.logoclass}
        onClick={homeRedirect}
        href="/"
      ></img>
      <img
        src={logophone}
        onClick={homeRedirect}
        className={styles.logoclassphone}
      ></img>
    </div>
  );
};

export default Logo;
