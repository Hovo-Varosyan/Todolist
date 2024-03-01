import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

function LoginRoute  ()  {
  const cookie=Cookies.get("t_user")
  return Boolean(cookie) === false ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
};

export default LoginRoute;
