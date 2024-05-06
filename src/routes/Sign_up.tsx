import React, { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { API_URL } from "../Auth/constant";

const Sign_up = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    /// uso api
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
        }),
      });
      if (response.ok) {
        console.log("Usario creado correctamente");
      } else {
        console.log("Error enviando");
      }
    } catch (error) {
      console.log("Error catch");
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/home"></Navigate>;
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
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
    </form>
  );
};

export default Sign_up;
