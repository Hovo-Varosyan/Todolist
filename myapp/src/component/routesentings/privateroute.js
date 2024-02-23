import { Navigate, Outlet } from "react-router-dom";
import GlobalNavbar from "../navbar";

function PrivateRoute ()  {
  return document.cookie.includes("t_user") === true ? (
    <>

      <GlobalNavbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
