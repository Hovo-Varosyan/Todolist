import { Navigate, Outlet } from "react-router-dom";

function LoginRoute  ()  {
  return document.cookie.includes("t_user") === false ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default LoginRoute;
