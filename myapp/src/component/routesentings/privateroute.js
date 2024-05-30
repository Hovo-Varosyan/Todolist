import { Navigate, Outlet } from "react-router-dom";
import GlobalNavbar from "../navbar";
import Cookies from 'js-cookie'


function PrivateRoute() {

  const cookie = Cookies.get("t_id")
  return Boolean(cookie) === true ? (
    <>

      <GlobalNavbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
