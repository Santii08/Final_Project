import React from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import '../CSS/Topics.css'
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Topics = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const auth = useAuth();
    if (auth.isAuthenticated) {
        return <Navigate to="/home"></Navigate>;
    }

    return (
        <div className="big-box">
            <h1>Topics</h1>
            
        </div>
        

    
    );
    
      
   
  
};

export default Topics;