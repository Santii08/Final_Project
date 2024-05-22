import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login";
import Sign_up from "./routes/Sign_up";
import Home from "./routes/Home";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { AuthProvider } from "./Auth/AuthProvider";
import Profile from "./routes/Profile";
import Topics from "./routes/Topics";
import Chats from "./routes/Chats";
import Salir from "./routes/Salir";
import EditPorfile from "./routes/EditPorfile";
import Crear from "./routes/Crear";
import Prueba from "./routes/Prueba";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/sign",
    element: <Sign_up></Sign_up>,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/salir",
        element: <Salir></Salir>,
      },
    ],
  },

  {
    path: "/topics",
    element: <Topics></Topics>,
  },
  {
    path: "/chats",
    element: <Chats></Chats>,
  },
  {
    path: "/editprofile",
    element: <EditPorfile></EditPorfile>,
  },
  {
    path: "/crear",
    element: <Crear></Crear>,
  },
  {
    path: "/prueba",
    element: <Prueba></Prueba>,
  },
  {
    path: "/editprofile",
    element: <EditPorfile></EditPorfile>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
