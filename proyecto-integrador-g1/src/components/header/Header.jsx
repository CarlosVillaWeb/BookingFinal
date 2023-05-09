import React, { useState, useContext } from "react";
import BoxButtons from "./BoxButtons";
import Logo from "./Logo";
import useMediaQuery from "../utils/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { UsuarioContext } from "../utils/context/usuarioContext";
import { AvatarUsuario } from "./AvatarUsuario";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import styles from "../module/Header.module.css";
import styles3 from "../module/BoxUser.module.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { usuario, token, removerTokenLocalStorage } =
    useContext(UsuarioContext);
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width:425px)");

  const signUpRedirect = () => {
    setOpen(false);
    navigate("/signUp");
  };

  const logInRedirect = () => {
    setOpen(false);
    navigate("/logIn");
  };

  const logOutRedirect = () => {
    removerTokenLocalStorage();
    window.location.href = "/";
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleAdmin = () => {
    navigate("/administracion");
  };

  return (
    <div
      className={`${styles.box} ${!!usuario ? styles.contenedorAvatar : ""}`}
    >
      <Logo />
      {matches ? (
        !!usuario ? (
          <div className={styles3.userbox}>
            <AvatarUsuario usuario={usuario}>
              {token !== undefined && usuario?.rol === "ADMIN" ? (
                <span onClick={handleAdmin} style={{ color: "#607D8B" }}>
                  <ListItemIcon>
                    <Settings fontSize="small" style={{ color: "#263238" }} />
                  </ListItemIcon>
                  Administracion
                </span>
              ) : undefined}
              <span onClick={logOutRedirect} style={{ color: "#607D8B" }}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "#263238" }} />
                </ListItemIcon>
                Cerrar sesión
              </span>
            </AvatarUsuario>
          </div>
        ) : (
          <>
            <div className={styles.contenedorIcono} onClick={showDrawer}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <Drawer
              title="Registro | Inicio de sesión"
              placement="top"
              onClose={onClose}
              open={open}
              getContainer={false}
              height={200}
              headerStyle={{
                textAlign: "center",
              }}
            >
              <div className={styles.boxbuttonstyle}>
                <button className={styles.buttonstyle} onClick={signUpRedirect}>
                  Crear cuenta
                </button>
                <button className={styles.buttonstyle} onClick={logInRedirect}>
                  Iniciar sesión
                </button>
              </div>
            </Drawer>
          </>
        )
      ) : !!usuario ? (
        <div className={styles3.userbox}>
          <AvatarUsuario usuario={usuario}>
            {token !== undefined && usuario?.rol === "ADMIN" ? (
              <span onClick={handleAdmin} style={{ color: "#607D8B" }}>
                <ListItemIcon>
                  <Settings fontSize="small" style={{ color: "#263238" }} />
                </ListItemIcon>
                Administracion
              </span>
            ) : undefined}
            <span onClick={logOutRedirect} style={{ color: "#607D8B" }}>
              <ListItemIcon>
                <Logout fontSize="small" style={{ color: "#263238" }} />
              </ListItemIcon>
              Cerrar sesión
            </span>
          </AvatarUsuario>
        </div>
      ) : (
        <BoxButtons handleAdmin={handleAdmin} />
      )}
    </div>
  );
};

export default Header;
