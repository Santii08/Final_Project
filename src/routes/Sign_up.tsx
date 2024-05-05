import React, { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";

const Sign_up = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to="/home"></Navigate>;
  }
  return (
    <div>
      <h1>SignUp</h1>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>Birthday</label>
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      ></input>

      <label>Correo Electrónico</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>

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

      <button>Sign Up</button>
    </div>
  );
};

export default Sign_up;
