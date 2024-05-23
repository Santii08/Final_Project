import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Auth/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import NavigationMenu from "./NavigationMenu";
import menuIcon from "../assets/menu-hamburguesa.png";
import '../CSS/Home.css'

interface Tweet {
  id: string;
  username: string;
  text: string;
  likes: number;
}

const Home = () => {
  const goTo = useNavigate();
  const [errorResponse, setErrorResponse] = useState("");
  const authToken = localStorage.getItem("authToken");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState<{ [tweetId: string]: number }>({});

  const handleRedirect = () => {
    goTo("/crear");
  };

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch(`${API_URL}/tweet`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const responseData: Tweet[] = await response.json();
          setTweets(responseData);
          setErrorResponse("");

          // Inicializar el estado de likes con el número de likes de cada tweet
          const initialLikes: { [tweetId: string]: number } = {};
          responseData.forEach((tweet) => {
            initialLikes[tweet.id] = tweet.likes;
          });
          setLikes(initialLikes);
        }
      } catch (error) {
        setErrorResponse(
          "Ha ocurrido un error al intentar obtener los tweets."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [authToken]);

  const handleLikeClick = async (tweetId: string) => {
    try {
      // Verificar si el usuario ya ha dado like al tweet
      const response = await fetch(`${API_URL}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ tweetId }),
      });

      if (response.ok) {
        const updatedLikes = {
          ...likes,
          [tweetId]: (likes[tweetId] || 0) + 1,
        };
        setLikes(updatedLikes);
      } else {
        const errorData = await response.json();
        if (
          response.status === 400 &&
          errorData.error === "Ya has dado like a este tweet"
        ) {
          setErrorResponse(errorData.error);
        } else {
          console.error("Error al dar like al tweet:", errorData.error);
        }
      }
    } catch (error) {
      console.error("Error al dar like al tweet:", error);
    }
  };
  return (
    <div className="box-bigH">
      <div className="home">
        <h1>HOME</h1>
        <NavigationMenu menuIcon={menuIcon} />
        
      </div>
      
      {errorResponse && <div style={{ color: "red" }}>{errorResponse}</div>}
      <div className="top">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="tweet-caja">
              <h3>{tweet.username}</h3>
              <p>{tweet.text}</p>
              <div className="tweet-like" onClick={() => handleLikeClick(tweet.id)}>
                <FontAwesomeIcon icon={faHeart} />
                <span>{likes[tweet.id] || 0}</span>
            </div>
          </div>
        ))}
        <div className="add">
          <button onClick={handleRedirect}>+</button>
        </div>
      </div>
     
    </div>
  );
};

export default Home;
