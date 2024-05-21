import React from "react";
import '../CSS/Topics.css'
import imagen from '../assets/busqueda.png'
import imagen2 from '../assets/flecha-pequena-izquierda.png'

const Topics = () => {
  return (
    <div className="big-boxT">
      <div className="title">
        <h1>TOPICS</h1>
      </div>
      
      <div className="search">
        <div className="img2">
          <img src= {imagen2} alt="Logo de login" />
        </div>
      
        <input
        type="text"
        placeholder="Buscar..."
        
      />
      
      <img src= {imagen} alt="Logo de login" />
      
        <ul>
          
        </ul>
      </div>
      
    </div>
  );
};

export default Topics;

