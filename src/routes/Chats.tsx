import React from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import '../CSS/Chats.css'
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Chats = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const auth = useAuth();
    if (auth.isAuthenticated) {
        return <Navigate to="/home"></Navigate>;
    }

    return (
        <div className="big-box">
            <h1>Chats</h1>
        </div>
        

    
    );
    
      
   
  
};

export default Chats;