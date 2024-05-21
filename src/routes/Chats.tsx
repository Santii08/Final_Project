import React from "react";
import '../CSS/Chats.css'
import img from '../assets/engranajes.png';

const Chats = () => {
  return (
    <div className="big-boxC">
      <div className="chat">
        <h1>CHATS</h1>
        <img src={img} alt="Configuración"></img>
      </div>
      
      <div className="boton">
        <button>+</button>
      </div>
    </div>

  );
};

export default Chats;
