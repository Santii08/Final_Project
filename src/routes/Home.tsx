import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Auth/constant";

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
        console.error("Error al dar like al tweet:", errorData.error);
      }
    } catch (error) {
      console.error("Error al dar like al tweet:", error);
    }
  };

  return (
    <div>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h3>{tweet.username}</h3>
            <p>{tweet.text}</p>
            <div>
              <label>Likes</label>
              <button type="button" onClick={() => handleLikeClick(tweet.id)}>
                Likes: {likes[tweet.id] || 0}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleRedirect}>Añadir</button>
      </div>
    </div>
  );
};

export default Home;
