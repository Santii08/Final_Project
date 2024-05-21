import React from "react";
import useAuthenticatedUser from "./Login"; // Importa el hook useAuthenticatedUser
import "../CSS/Profile.css";
import { Link } from "react-router-dom";
import imagen from '../assets/Imagen sin título.png'

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
        <div className="image4">
          <img src= {imagen} alt="Logo de login" />
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
      
    </div>
  );
};

export default Profile;
