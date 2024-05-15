import React from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import '../CSS/Profile.css'
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import imagen from "../assets/departamento.png"

const Profile = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const auth = useAuth();
    if (auth.isAuthenticated) {
        return <Navigate to="/home"></Navigate>;
    }

    return (
        
        <div className="big-boxP">
            <div className="nav">
                <div className="titulo">
                    <p>Username</p>
                    <p>Descripción</p>
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