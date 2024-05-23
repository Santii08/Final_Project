import React from "react";
import { useAuth } from "../Auth/AuthProvider";
import '../CSS/Salir.css'

const Salir = () => {
  const { setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    setIsAuthenticated(false);
    const authToken = localStorage.removeItem("authToken");
    const obtenerId = localStorage.removeItem("userId");
  };
  return (
    <div className="big-boxOut">
      <div className="container-w">
        <h2>Muchas gracias, por interactuar con nosotros. ¡Ten un lindo día, no olvides volver!</h2>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
};

export default Salir;
