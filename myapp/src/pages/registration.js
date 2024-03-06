import React, { useState } from "react";
import "../assets/style/pageStyle/login.scss";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import server from "../api/api";

function Registr() {
  document.body.style.backgroundColor = "black";

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [resError, setResError] = useState("")
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    server
      .post("/registr", { name, email, password })
      .then((response) => {
        setResError("")
        navigate("/login")
      })
      .catch((error) => {
        if (error.response && error.response.data.err === 11000) {
          setResError('Email busy')
        } else {
          console.log(error)
          setResError('ERROR')

        }
      });
  }

  return (
    <>
      <section className="login_background">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="login" onSubmit={handleSubmit}>
          <h3>Registration </h3>
          {resError && <p className="warning">{resError}</p>}
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            pattern="^[a-zA-Z\s]+$"
            placeholder="Name"
            id="name"
            minLength="3"
            name="name"
            required
          />
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            placeholder="Email or Phone"
            id="email"
            name="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
            minLength="6"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button>Registration</button>
          <div className="page__link">
            Do you have an account?<Link to="/login">Login</Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Registr;
