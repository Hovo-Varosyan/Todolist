import { Navigate, Outlet } from "react-router-dom";
import GlobalNavbar from "../navbar";
import io from 'socket.io-client';
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:8080")

function PrivateRoute() {
 const [count, setCount]=useState()
  // useEffect(() => {
  // socket.emit("online");
  // socket.on('status', (e)=>setCount(e))
  //   return () => {
  //     socket.emit("offline");
  //   };
  // }, []);
  console.log(count)
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
