import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../assets/menu-hamburguesa.png'
import '../CSS/NavigationMenu.css'
import img from '../assets/usuario.png'
import img2 from '../assets/periodico.png'
import img3 from '../assets/mensajes.png'
import img4 from '../assets/lapiz.png'
import img5 from '../assets/hogar.png'
import img6 from '../assets/salida.png'



interface NavigationMenuProps{
    menuIcon: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({menuIcon}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navigation">
            <div className="menu-toggle" onClick={toggleMenu}>
                <img src={menuIcon} alt="Menu" className="menu-icon" />
            </div>
            <nav className={`menu ${menuOpen ? 'open' : ''}`}>     
                <ul>
                    <li>
                        <img src={img5} alt="Ca-icon" className='menu-img'></img>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <img src={img} alt="Persona-icon" className='menu-img'></img>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <img src={img4} alt="Lapiz-icon" className='menu-img4'></img>
                        <Link to ="/editprofile">Edit Profile</Link>
                    </li>
                    <li>
                        <img src={img2} alt="Periodico-icon" className='menu-img'></img>
                        <Link to="/topics">Topics</Link>
                    </li>

                    <li>
                        <img src={img6} alt="Logout-icon" className='menu-img'></img>
                        <Link to="/salir">Logout</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavigationMenu;