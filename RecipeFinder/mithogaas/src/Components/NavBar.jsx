import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useComparison } from '../Hooks/useComparison';

const NavBar = () => {
 const [isOpen, setIsOpen] = useState(false);
 const location = useLocation();
 const { getComparisonCount } = useComparison();
 const isActive = (path) => location.pathname === path;

 const linkClasses = (path) => {
    const baseClasses = "relative px-4 py-2 font-extrabold transition-all duration-300 font-share border-none bg-transparent cursor-pointer";
    const colorClasses = isActive(path) ? 'text-green-600' : 'text-gray-700 hover:text-green-600';
    const underlineClasses = isActive(path) ? 'before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-green-300 before:scale-x-100' : 'before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-green-300 before:origin-left before:transition-transform before:duration-300 before:ease-out before:scale-x-0 hover:before:scale-x-100';
       return `${baseClasses} ${colorClasses} ${underlineClasses}`;
    };

    const mobileLinkClasses = (path) => {
     const baseClasses = "w-full text-left block px-6 py-3 font-extrabold transition-all duration-300 font-share rounded-lg border-none bg-transparent cursor-pointer";
     const activeClasses = isActive(path) ? 'text-green-600 bg-green-100' : 'text-gray-700 hover:text-green-600 hover:bg-green-50';
        return `${baseClasses} ${activeClasses}`;
    };

    const handleNavClick = (path) => {
     setCurrentPath(path);
     setIsOpen(false);
    };

    return(
     <nav className="sticky top-0 z-50 bg-white shadow-md" style={{ animation: 'slideDown 0.5s ease-out' }}>
      <div className="max-w-7xl mx-auto px-6">
       <div className="flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-extrabold text-gray-800 hover:text-green-600 transition-all duration-300 hover:scale-105 flex items-center gap-2 group border-none bg-transparent cursor-pointer">
         <span className="inline-block transition-transform duration-300 group-hover:rotate-12">🍽️</span>
         <span className="transition-all duration-300">मीठो गाँस</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
         <Link to="/" className={linkClasses('/')}>Home</Link>
         <Link to="/recipes" className={linkClasses('/recipes')}>Recipes</Link>
         <Link to="/favorites" className={linkClasses('/favorites')}>Favorites</Link>
         <Link to="/mealplanner" className={linkClasses('/mealplanner')}>Meal Planner</Link>
         <Link to="/compare" className={linkClasses('/compare')}>Compare</Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-green-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 border-none bg-transparent cursor-pointer" aria-label="Toggle menu" aria-expanded={isOpen}>
         <div className="w-6 h-5 flex flex-col justify-between">
          <span className="block h-0.5 bg-gray-700 rounded-full transition-all duration-300" style={{ transform: isOpen ? 'rotate(45deg) translateY(9px)' : 'none'}} ></span>
          <span className="block h-0.5 bg-gray-700 rounded-full transition-all duration-300" style={{ opacity: isOpen ? 0 : 1 }} ></span>
          <span className="block h-0.5 bg-gray-700 rounded-full transition-all duration-300" style={{ transform: isOpen ? 'rotate(-45deg) translateY(-9px)' : 'none' }} ></span>
         </div>
        </button>
       </div>

        <div className="md:hidden overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isOpen ? '320px' : '0', opacity: isOpen ? 1 : 0 }} >
          <div className="py-2 space-y-1 border-t border-gray-200">
            <Link to="/" className={mobileLinkClasses('/')}>🏠 Home</Link>
            <Link to="/recipes" className={mobileLinkClasses('/recipes')}>📖 Recipes</Link>
            <Link to="/favorites" className={mobileLinkClasses('/favorites')}>❤️ Favorites </Link>
            <Link to="/mealplanner" className={mobileLinkClasses('/mealplanner')}>📋 Meal Planner</Link>
            <Link to="/compare" className={mobileLinkClasses('/compare')}>⚖️ Compare</Link>
           </div>
          </div>
         </div>

        <style>
            {` @keyframes slideDown {
                from { transform: translateY(-100%); opacity: 0; } 
                to { transform: translateY(0); opacity: 1; } }`
            }
        </style>
     </nav>
    );
}

export default NavBar;