import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

function LoginRoute  ()  {
  const cookie=Cookies.get("t_id")
  return Boolean(cookie) === false ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
};

export default LoginRoute;
