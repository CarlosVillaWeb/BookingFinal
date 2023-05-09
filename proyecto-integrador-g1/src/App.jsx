import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/Home";
import SignUp from "./components/pages/signUp/SignUp";
import LogIn from "./components/pages/logIn/LogIn";
import MailList from "./components/mailList/MailList";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Producto } from "./components/pages/producto/Producto";
import { Reserva } from "./components/pages/reserva/reserva";
import { AdministracionProducto } from "./components/pages/Administracion/AdministracionProducto";
import { UsuarioContext } from "./components/utils/context/usuarioContext";
import {
  ADMINISTRACION,
  LOG_IN,
  NOT_FOUND,
  PRODUCTO,
  RESERVA,
  SIGN_UP,
} from "./routes/paths";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import "./App.css";

function App() {
  const { usuario, token, editarErrorAutenticacion } =
    useContext(UsuarioContext);

  return (
    <div className="contenedor">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path={PRODUCTO} element={<Producto />} />
        <Route path={SIGN_UP} element={<SignUp />} />
        <Route path={LOG_IN} element={<LogIn />} />
        <Route path={NOT_FOUND} element={<div>No Encontrado</div>} />
        <Route
          element={
            <PrivateRoutes
              autorizacion={!!token}
              editarErrorAutenticacion={editarErrorAutenticacion}
              redirectTo={LOG_IN}
            />
          }
        >
          <Route path={RESERVA} element={<Reserva />} />
        </Route>
        <Route
          path={ADMINISTRACION}
          element={
            <PrivateRoutes
              token={token}
              autorizacion={!!token && usuario?.rol === "ADMIN"}
              editarErrorAutenticacion={editarErrorAutenticacion}
              redirectTo={LOG_IN}
            >
              <AdministracionProducto />
            </PrivateRoutes>
          }
        />
      </Routes>
      <MailList />
      <Footer />
    </div>
  );
}
export default App;
