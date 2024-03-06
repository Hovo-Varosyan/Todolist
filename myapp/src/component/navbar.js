import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style/pageStyle/globalnavbar.scss";
import { useNavigate } from "react-router";
import { memo, useEffect, useState } from "react";
import server from "../api/api";
import Cookies from "js-cookie";

function GlobalNavbar() {
  const navigate = useNavigate();
  const [cookie,setCookie]=useState("")
  function logout() {
    server
      .post("/logout")
      .then((res) => navigate("/login"))
      .catch((res) => console.log(res));
  }
useEffect(()=>{setCookie(Cookies.get('t_role'))},[])
  return (
    <>
     <Navbar expand="lg" variant="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">Node Mongoose</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/addtask">Add Task</Nav.Link>
            {cookie === 'admin' && (
              <Nav.Link href="/userlist">User List</Nav.Link>
            )}
            <button className="nav-link" onClick={() => logout()}>
              Log out
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>

  );
}

export default memo(GlobalNavbar);
