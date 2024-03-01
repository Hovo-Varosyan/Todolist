import { Navigate, Outlet } from "react-router-dom";
import GlobalNavbar from "../navbar";
import io from 'socket.io-client';
import Cookies from 'js-cookie'
const socket = io.connect("http://localhost:8080")

function PrivateRoute() {
 

  const cookie = Cookies.get("t_user")

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
