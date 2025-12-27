
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Hooks/useTheme.jsx'

const NavBar = () => {
  const {theme, toggleTheme} = useTheme();

    return(
     <nav className='bg-white dark:bg-gray-900 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-[#58e633] transition-colors font-share">मीठो गाँस</Link>

        <div className='flex items-center gap-4'>
        <Link to="/favorites" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-[#58e633] dark:hover:text-[#a7f1a0] font-semibold transition-colors font-share">Favorites</Link>
        </div>

        <button onClick={toggleTheme} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-[#a7f1a0] dark:hover:bg-[#58e633] transition-colors font-share font-semibold">{theme === "light" ? "🌙 Dark" : "☀️ Light"}</button>
        </div>
      </div>
     </nav>
    );
}

export default NavBar