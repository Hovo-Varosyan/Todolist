import React, { useState } from "react";
import "../assets/style/pageStyle/login.scss";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import server from "../api/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState(false)
  document.body.style.backgroundColor = "black";
  function handleSubmit(e) {
    e.preventDefault();
    server
      .post("/login", { email, password })
      .then((response) => {
        if (err) {
          setErr(false)
        }
        document.body.style.backgroundColor = "white";
        navigate("/home");
      })
      .catch((err) => {
        console.log(err)
        if (err.response && err.response.data.message === false) {
          setErr(err.response.data.err)
        } else {
          console.log(err)
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
          <h3>Login Here</h3>
          {err && <p className="warning">{err}</p>}
          <label htmlFor="email"> Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or Phone"
            id="email"
            name="email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            name="password"
            id="password"
          />

          <button>Log In</button>
          <div className="page__link">
            Do you have no account?<Link to="/registr">Registration</Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
