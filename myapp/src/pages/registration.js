import React, { useState } from "react";
import "../assets/style/login.scss";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import server from "../api/api";

function Registr() {
  document.body.style.backgroundColor = "black";

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault();
    server
      .post("/registr", { name, email, password })
      .then((respons) => (
        navigate('/login')
      ))
      .catch((respons) => {
        console.log(respons)
      });
  }

  return (
    <>
      <main className="login_background">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form className="login" onSubmit={handleSubmit}>
          <h3>Registration </h3>

          <label htmlFor="name"> Name</label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
            id="name"
            name="name"
          />
          <label htmlFor="email"> Email</label>
          <input
            type="text"
            placeholder="Email or Phone"
            id="email"
            name="email"
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button>Registration</button>
          <div className='page__link'>Do you have an account?<Link to="/login">Login</Link></div>

        </form>

      </main>
    </>
  );
}

export default Registr;
