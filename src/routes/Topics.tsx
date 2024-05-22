import React, { useState, useEffect } from "react";
import { API_URL } from "../Auth/constant";
import "../CSS/Topics.css";
import imagen from "../assets/busqueda.png";
import imagen2 from "../assets/flecha-pequena-izquierda.png";
import NavigationMenu from "./NavigationMenu";
import menuIcon from '../assets/menu-hamburguesa.png'

interface Tweet {
  id: string;
  username: string;
  text: string;
  likes: number;
}

const Topics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchTweetsByTopic = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/topic/${searchTerm}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data: Tweet[] = await response.json();
          setTweets(data);
          setError(null);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Error fetching tweets");
        }
      } catch (error) {
        console.error("Error fetching tweets:", error);
        setError("Error fetching tweets");
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== "") {
      fetchTweetsByTopic();
    } else {
      setTweets([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLikeClick = async (tweetId: string) => {
    try {
      const response = await fetch(`${API_URL}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ tweetId }),
      });

      if (response.ok) {
        const updatedTweets = tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            return { ...tweet, likes: tweet.likes + 1 };
          }
          return tweet;
        });
        setTweets(updatedTweets);
      } else {
        const errorData = await response.json();
        console.error("Error al dar like al tweet:", errorData.error);
      }
    } catch (error) {
      console.error("Error al dar like al tweet:", error);
    }
  };

  return (
    <div className="big-boxT">
      <NavigationMenu menuIcon={menuIcon} ></NavigationMenu>
      <div className="title">
        <h1>TOPICS</h1>
      </div>

      <div className="search">
        <div className="img2">
          <img src={imagen2} alt="Logo de login" />
        </div>

        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <img src={imagen} alt="Logo de login" />

        <ul>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            tweets.map((tweet) => (
              <li key={tweet.id}>
                <h3>{tweet.username}</h3>
                <p>{tweet.text}</p>
                <div>
                  <label>Likes</label>
                  <button
                    type="button"
                    onClick={() => handleLikeClick(tweet.id)}
                  >
                    Likes: {tweet.likes}
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Topics;
