import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./../CSS/Login.css";
import { API_URL } from "../Auth/constant";
import { useAuth } from "../Auth/AuthProvider";
import imagen from '../assets/Imagen sin título.png'

interface User {
  username: string;
  email: string;
  // Otros campos si los hubiera
}

// Hook para manejar la autenticación del usuario
const useAuthenticatedUser = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null); // Especificamos que el usuario puede ser de tipo User o null

  // Función para establecer el usuario autenticado
  const setAuthenticated = (user: User | null) => {
    setAuthenticatedUser(user);
  };

  return { authenticatedUser, setAuthenticated };
};
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const { setAuthenticated } = useAuthenticatedUser(); // Obtener la función para establecer el usuario autenticado
  const goTo = useNavigate();
  const auth = useAuth();
  const { setIsAuthenticated } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/loginpr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.ok) {
        console.log("Usuario logeado correctamente");
        setErrorResponse("");
        setIsAuthenticated(true);
        const json = await response.json(); // Leer la respuesta JSON
        setAuthenticated(json.usuario); // Guardar el usuario autenticado usando la función del hook
        goTo("/home");
      } else {
        console.log("Error enviando");
        const json = await response.json();
        setErrorResponse(json.error || "Username o Password equivocados");
      }
    } catch (error) {
      console.log("Error catch");
      setErrorResponse("Error de red");
    }
  }

  return (
    <div className="big-box">
      <div className="inside">
        <div className="image">
          <img src= {imagen} alt="Logo de login" />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="white-container"></div>
            <h1>WELCOME AGAIN, LOG-IN AND START THE EXPERIENCE</h1>
            {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
            <div className="login">
              <label className="pas">Username</label>

              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              ></input>

              <label className="pas">Password </label>
              <input
                type="password"
                value={password}
                placeholder="✶ ✶ ✶ ✶ ✶ ✶ ✶"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button>LOGIN</button>
              <div className="last">
                <h3>¿Todavía no tienes cuenta?</h3>
                <h3>Create una dándole click en el siguiente botón</h3>
                {/* Utilizamos Link para redirigir al componente de SignUp */}
                <Link to="/sign">
                  <button>REGISTER</button>
                </Link>
              </div>
              
          </div>
        </form>
        
      </div>
      
    </div>
  );
};

export default Login;
