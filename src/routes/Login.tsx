import React from "react";
import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './../CSS/Login.css'
import imagen from "../assets/departamento.png"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to="/home"></Navigate>;
  }

  return (
    <div className="big-box">
      {/*<div className="image">
        <img src= {imagen} alt="Logo de login" />
  </div>*/}

  <div className="white-container"></div>
      <h1>Login</h1>
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
