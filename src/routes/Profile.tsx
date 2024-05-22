import React, { useState, useEffect } from "react";
import { API_URL } from "../Auth/constant";
import { useParams } from "react-router-dom";
import imagen from "../assets/Imagen sin título.png";
import menuIcon from "../assets/menu-hamburguesa.png";
import NavigationMenu from "./NavigationMenu";
import '../CSS/Profile.css'


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
  const obetenerId = localStorage.getItem("userId");

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
        // Actualización exitosa, actualiza la lista de tweets
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
        const response = await fetch(`${API_URL}/profile/${obetenerId}`, {
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
  }, [authToken, obetenerId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (tweets.length === 0 && !error) {
    return <div>Cargando...</div>;
  }

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
      <div>
        <h3>Tweets:</h3>
        {tweets.length > 0 ? (
          <ul>
            {tweets.map((tweet) => (
              <li key={tweet.id} className="tweet-container">
                <div>
                  <p>Text: {tweet.text}</p>
                  <p>Hashtag: {tweet.Hashtag}</p>
                  <p>Topic: {tweet.topic}</p>
                  <p>Likes: {tweet.likes}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
