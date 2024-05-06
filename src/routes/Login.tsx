import React from "react";
import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to="/home"></Navigate>;
  }

  return (
    <div>
      <h1>Login</h1>
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
      <div>
        <h1>Tienes cuenta?, crea una aquí</h1>
        {/* Utilizamos Link para redirigir al componente de SignUp */}
        <Link to="/sign">
          <button>SignUp</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;