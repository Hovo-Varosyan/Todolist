import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style/globalnavbar.scss";
import { useNavigate } from "react-router";
import { memo } from "react";
import server from "../api/api";

function GlobalNavbar() {
  const navigate = useNavigate();

  function logout() {
    server
      .post("/logout")
      .then((res) => navigate('/login'))
      .catch((res) => console.log(res));
  }


  return (
    <Navbar expand="lg" variant="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Node Mongoose</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/addtask">Add Task</Nav.Link>
            {document.cookie.split(';').includes(" t_role=admin") && <Nav.Link href="/userlist">User List</Nav.Link>}
            <button className="nav-link" onClick={() => logout()}>
              Log out
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default memo(GlobalNavbar);
