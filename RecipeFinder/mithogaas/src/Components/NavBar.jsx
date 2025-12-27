
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Hooks/useTheme.jsx'

const NavBar = () => {
  const {theme, toggleTheme} = useTheme();

    return(
     <nav>
      <Link to="/">RecipeFinder</Link>

      <div>
        <Link to="/favorites">Favorites</Link>

        <button onClick={toggleTheme}>{theme === "light" ? "Dark" : "Light"}</button>
      </div>
     </nav>
    );
}

export default NavBar