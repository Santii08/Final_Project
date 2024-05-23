import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Auth/constant";
import { useParams, Link } from "react-router-dom";
import imagen from "../assets/Avatar-Profile-PNG-Free-Image.png";
import menuIcon from "../assets/menu-hamburguesa.png";
import NavigationMenu from "./NavigationMenu";
import '../CSS/Profile.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";


interface Tweet {
  id: string;
  text: string;
  Hashtag: string;
  topic: string;
  likes: number;
  username: string;
}

const Profile = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingTweet, setEditingTweet] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [editedHashtag, setEditedHashtag] = useState<string>("");
  const authToken = localStorage.getItem("authToken");
  const obtenerId = localStorage.getItem("userId");
  const goTo = useNavigate();

  const handleEdit = (tweetId: string) => {
    setEditingTweet(tweetId);
    const tweetToEdit = tweets.find((tweet) => tweet.id === tweetId);
    if (tweetToEdit) {
      setEditedText(tweetToEdit.text);
      setEditedHashtag(tweetToEdit.Hashtag);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`${API_URL}/edit/${editingTweet}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          text: editedText,
          hashtag: editedHashtag,
        }),
      });

      if (response.ok) {
        const updatedTweets = tweets.map((tweet) => {
          if (tweet.id === editingTweet) {
            return {
              ...tweet,
              text: editedText,
              Hashtag: editedHashtag,
            };
          }
          return tweet;
        });
        setTweets(updatedTweets);
        setEditingTweet(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al editar el tweet");
      }
    } catch (error) {
      console.error("Error al editar el tweet:", error);
      setError("Error al editar el tweet");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authToken) {
        setError("No se encontró el token de autenticación");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/profile/${obtenerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const fetchedTweets: Tweet[] = await response.json();
          setTweets(fetchedTweets);
          setError(null);
        } else if (response.status === 404) {
          // Usuario no encontrado o no tiene tweets
          return (
            <div className="no-tweets-container">
              <p>No tienes tweets, ¿quieres publicar uno?</p>
              <button onClick={() => goTo("/crear")}>Publicar un tweet</button>
            </div>
          );
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Error al obtener los tweets");
        }
      } catch (error) {
        console.error("Error al obtener los tweets:", error);
        setError("Error al obtener los tweets");
      }
    };

    fetchUserData();
  }, [authToken, obtenerId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tweets.length && !error) {
    return (
      <div className="no-tweets-container">
        <p>No tienes tweets, ¿quieres publicar uno?</p>
        <button onClick={() => goTo("/crear")}>Publicar un tweet</button>
      </div>
    );
  }
  const handleDelete = async (tweetId: string) => {
    try {
      const response = await fetch(`${API_URL}/delete/${tweetId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        // Eliminación exitosa, actualiza la lista de tweets eliminando el tweet eliminado
        const updatedTweets = tweets.filter((tweet) => tweet.id !== tweetId);
        setTweets(updatedTweets);
        console.log("Tweet eliminado correctamente");
      } else {
        const responseData = await response.text(); // Leer la respuesta como texto
        console.error("Error al eliminar el tweet:", responseData);
      }
    } catch (error) {
      console.error("Error al eliminar el tweet:", error);
    }
  };

  return (
    <div className="big-boxP">
    <NavigationMenu menuIcon={menuIcon} />
    <div className="nav">
      <div className="titulo">
        <p>Username: {tweets.length > 0 ? tweets[0].username : "Cargando..."}</p>
        <p>Tienes {tweets.length} tweets</p>
      </div>
      <div className="image4">
        <img src={imagen} alt="Logo de login" />
      </div>
    </div>
    <div className="my-tweets">
      <h3>Tweets:</h3>
      <ul>
        {tweets.map((tweet) => (
          <div key={tweet.id} className="tweet-container">
            {editingTweet === tweet.id ? (
              <div>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <input
                  type="text"
                  value={editedHashtag}
                  onChange={(e) => setEditedHashtag(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Guardar</button>
              </div>
            ) : (
              <div className="content">
                <p>Text: {tweet.text}</p>
                <p>Hashtag: {tweet.Hashtag}</p>
                <p>Topic: {tweet.topic}</p>
                <p>Likes: {tweet.likes}</p>
                <div className="icons">
                  <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(tweet.id)} />
                  <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(tweet.id)} />
                </div>
                
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  </div>
);
};

export default Profile;
