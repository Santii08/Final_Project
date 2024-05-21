import React, { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { ErrorResponse, Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../Auth/constant";
import { AuthResponseError } from "../types/types";

const Sign_up = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    /// uso api
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signuppr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
          birthday,
          email,
        }),
      });
      if (response.ok) {
        console.log("Usario creado correctamente");
        setErrorResponse("");
        goTo("/");
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
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
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

      <p>Complete correctamente los campos</p>
    </div>
  );
};

export default Sign_up;
