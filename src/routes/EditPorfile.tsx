import React, { useState, useEffect } from "react";

import { API_URL } from "../Auth/constant";

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
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Birthday</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <div>
          <label>email:{email}</label>
        </div>
        <button type="submit">Editar</button>
        {errorResponse && <p style={{ color: "red" }}>{errorResponse}</p>}
      </form>
    </div>
  );
};

export default EditProfile;
