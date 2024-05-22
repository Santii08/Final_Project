import React, { useState } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import { API_URL } from "../Auth/constant";
import '../CSS/Crear.css'
import NavigationMenu from "./NavigationMenu";
import menuIcon from '../assets/menu-hamburguesa.png'

const Crear = () => {
  const authToken = localStorage.getItem("authToken");
  const [errorResponse, setErrorResponse] = useState("");
  const [tweet, setTweet] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [topic, setTopic] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ tweet, hashtag, topic }), // Enviamos el número de likes
      });

      if (response.ok) {
        const json = await response.json();
        console.log("Tweet creado correctamente");
        setErrorResponse("");

        setHashtag(""); // Reiniciamos el contador de likes después de enviar el tweet
        setTweet(""); // Limpiamos el campo de tweet
        setTopic("");
        // Muestra un mensaje de éxito al usuario
        setErrorResponse("Tweet creado correctamente");
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

      <div className="b-crear">
        <NavigationMenu menuIcon={menuIcon} />
        <form className="cajas" onSubmit={handleSubmit}>
          <h1 className="crear">Crea tu tweet</h1>
          <div>
            <label>Tweet</label>
            <input
              type="text"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </div>
          <div>
            <label>Hashtag</label>
            <input
              type="text"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
            />
          </div>
          <div>
            <label>Topic</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="">Selecciona un tema</option>
              <option value="Deportes">Deportes</option>
              <option value="Comedia">Comedia</option>
              <option value="Terror">Terror</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
        {errorResponse && <p>{errorResponse}</p>}
  
        
      </div>

  );
};

export default Crear;
