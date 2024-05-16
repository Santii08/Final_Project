import React from "react";
import '../CSS/Chats.css'
import img from '../assets/engranajes.png';

const Chats = () => {
  return (
    <div className="big-boxC">
      <div className="title">
        <p>CHATS</p>
        <img src={img} alt="Configuración"></img>
      </div>
      
      <div className="boton">
        <button>M</button>
      </div>
    </div>

  );
};

export default Chats;
