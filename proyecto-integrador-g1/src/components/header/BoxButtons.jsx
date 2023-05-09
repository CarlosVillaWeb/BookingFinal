import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../module/Boxbutton.module.css";
import styles2 from "../module/Buttons.module.css";

const BoxButtons = () => {
  const navigate = useNavigate();
  const signUpRedirect = () => {
    navigate("/signUp");
  };

  const logInRedirect = () => {
    navigate("/logIn");
  };

  return (
    <div className={styles.boxbuttonstyle}>
      <button className={styles2.buttonstyle} onClick={signUpRedirect}>
        Crear cuenta
      </button>
      <button className={styles2.buttonstyle} onClick={logInRedirect}>
        Iniciar sesión
      </button>
    </div>
  );
};

export default BoxButtons;
