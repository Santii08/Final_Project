import React from "react";
import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./../CSS/Login.css";
import imagen from "../assets/departamento.png";
import { API_URL } from "../Auth/constant";
import type { AuthResponseError } from "../types/types";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    /// uso api
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.ok) {
        console.log("Usario logeado correctamente");
        setErrorResponse("");
        goTo("/home");
      } else {
        console.log("Error enviando");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log("Error catch");
    }
  }

  return (
    <div className="big-box">
      {/*<div className="image">
        <img src= {imagen} alt="Logo de login" />
  </div>*/}
      <form className="form" onSubmit={handleSubmit}>
        <div className="white-container"></div>
        <h1>Login</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <div className="login">
          <label className="pas">Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <label className="pas">Password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>LOGIN</button>
        </div>
      </form>
      <div>
        <h3>¿Todavía no tienes cuenta?</h3>
        <h3>Create una dándole click en el siguiente botón</h3>
        {/* Utilizamos Link para redirigir al componente de SignUp */}
        <Link to="/sign">
          <button>REGISTER</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
