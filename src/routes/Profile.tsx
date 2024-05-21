import React from "react";
import useAuthenticatedUser from "./Login"; // Importa el hook useAuthenticatedUser
import "../CSS/Profile.css";
import { Link } from "react-router-dom";

interface User {
  username: string;
  email: string;
  // Otros campos si los hubiera
}

const Profile = () => {
  return (
    <div className="big-boxP">
      <div className="nav">
        <div className="titulo">
          <p>Username</p>
          <p>Descripción</p>
        </div>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
              <li>
                <Link to="/salir">Message</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <div className="fol">
        <p>Followers</p>
        <p>Following</p>
      </div>
      <button>Plus</button>
    </div>
  );
};

export default Profile;
