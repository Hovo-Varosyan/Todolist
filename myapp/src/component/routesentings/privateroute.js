import { Navigate, Outlet } from "react-router-dom";
import GlobalNavbar from "../navbar";
import Cookies from 'js-cookie'


function PrivateRoute() {

  const cookie = Cookies.get("t_id")
console.log(2)
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
