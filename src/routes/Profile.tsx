import React from "react";
import useAuthenticatedUser from "./Login"; // Importa el hook useAuthenticatedUser
import "../CSS/Profile.css";
import { Link } from "react-router-dom";
import imagen from '../assets/Imagen sin título.png'
import menuIcon from '../assets/menu-hamburguesa.png'
import NavigationMenu from "./NavigationMenu";

interface User {
  username: string;
  email: string;
  // Otros campos si los hubiera
}

const Profile = () => {
  return (
    <div className="big-boxP">
      
      <NavigationMenu menuIcon={menuIcon} ></NavigationMenu>
      <div className="nav">
        <div className="titulo">
          <p>Username</p>
          <p>Description...</p>
        </div>
        <div className="image4">
          <img src= {imagen} alt="Logo de login" />
        </div>
      </div>      
    </div>
  );
};

export default Profile;
