import React, { useState, useEffect } from "react";
import '../CSS/EditProfile.css'
import imagen from '../assets/Imagen sin título.png'
import lapiz from '../assets/lapiz.png'
import menuIcon from '../assets/menu-hamburguesa.png'
 
import { API_URL } from "../Auth/constant";
import NavigationMenu from "./NavigationMenu";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const authToken = localStorage.getItem("authToken");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          username,
          password,
          birthday,
          email,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Cambios realizados correctamente");
        setErrorResponse("");
        // Muestra un mensaje de éxito al usuario

        setEmail(responseData.email);
      } else {
        const errorData = await response.json();
        console.log("Error enviando", errorData);
        setErrorResponse(errorData.error || "Error desconocido");
      }
    } catch (error) {
      console.log("Error catch", error);
      setErrorResponse(
        "Ha ocurrido un error al intentar actualizar el perfil."
      );
    }
  }

  return (
    <div className="big-boxE">
      <NavigationMenu menuIcon={menuIcon}></NavigationMenu>
      <div className="img5">
        <img src={imagen} alt="Logo de login" />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        
        <div className="edit-box">
          <div className="part">
            <label>Username</label>
            <img src={lapiz} alt="Logo de login" className="lapiz"/>
          </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          
          
        
          <div className="part">
            <label>Password</label>
            <img src={lapiz} alt="Logo de login" className="lapiz"/>
          </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          
          <div className="part">
            <label>Birthday</label>
            <img src={lapiz} alt="Logo de login" className="lapiz"/>
          </div>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
         
        <button type="submit" className="rosa">Done</button>
        {errorResponse && <p style={{ color: "red" }}>{errorResponse}</p>}
        </div>
        
      </form>
    </div>
  );
};

export default EditProfile;
