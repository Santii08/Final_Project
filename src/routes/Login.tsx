import React from "react";
import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './../CSS/Login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to="/home"></Navigate>;
  }

  return (
    <div className="big-box">
      <h1>Login</h1>
      <div className="login">
      <label>Username</label>

      
      <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>

      <label>Password </label>
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
      </div>
    </div>
  );
};

export default Login;
