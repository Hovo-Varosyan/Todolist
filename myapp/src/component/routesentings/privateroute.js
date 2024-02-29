import { Navigate, Outlet } from "react-router-dom";
import GlobalNavbar from "../navbar";
import io from 'socket.io-client';
import { useEffect } from "react";
import Cookies from 'js-cookie'
const socket = io.connect("http://localhost:8080")

function PrivateRoute() {
  useEffect(() => {

    socket.emit('join', Cookies.get('t_id'))

  }, [])
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
