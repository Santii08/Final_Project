import React, { useState } from "react";
import { API_URL } from "../Auth/constant";
import { AuthResponseError } from "../types/types";

const EditPorfile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          birthday,
          email,
        }),
      });
      if (response.ok) {
        console.log("Cambios realizados correctamente");
        setErrorResponse("");
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

        <button type="submit">Editar</button>
      </form>
    </div>
  );
};

export default EditPorfile;
