import React from "react";
import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
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
    </div>
  );
};

export default Login;
