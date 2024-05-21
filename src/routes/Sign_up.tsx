import React, { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { ErrorResponse, Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../Auth/constant";
import { AuthResponseError } from "../types/types";
import '../CSS/Sign_up.css'
import imagen from '../assets/Imagen sin título.png'

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
      const response = await fetch(`${API_URL}/signup`, {
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
    <div className ="big-boxS">
      <div className="image2">
        <img src= {imagen} alt="Logo de login" />
      </div>
      <div className="white-container2">
        <form className="form2" onSubmit={handleSubmit}>
        
          <h1>WELCOME, REGISTER SO YOU CAN USE THE APP</h1>
          {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
          <label className="q">Name</label>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>

          <label className="q">Birthday</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          ></input>

          <label className="q">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            placeholder="contact@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label className="q">Username</label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <label className="q">Password </label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="end">
            <button>Sign Up</button>
            <p>Complete correctamente los campos</p>
          </div>
          
        </form>
      </div>

      
    </div>
  );
};

export default Sign_up;
