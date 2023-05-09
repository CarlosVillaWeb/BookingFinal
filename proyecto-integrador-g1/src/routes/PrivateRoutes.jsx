import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({
  children,
  token,
  autorizacion,
  redirectTo = "/",
  editarErrorAutenticacion,
}) => {
  if (!autorizacion) {
    if (token) {
      return <Navigate to="/" />;
    } else {
      editarErrorAutenticacion(true);
      return <Navigate to={redirectTo} />;
    }
  }

  return children ? children : <Outlet />;
};
