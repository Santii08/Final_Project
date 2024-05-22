import React from "react";
import { Link } from "react-router-dom";

const Notweets = () => {
  return (
    <div className="no-tweets-container">
      <p>No tienes tweets, ¿quieres publicar uno?</p>
      <Link to="/crear" className="button-create-tweet">
        Crear Tweet
      </Link>
    </div>
  );
};

export default Notweets;
