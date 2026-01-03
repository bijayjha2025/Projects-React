
import { Link } from 'react-router-dom';

const NavBar = () => {
    return(
     <nav className="flex items-center justify-between px-6 py-4 shadow">
        <Link to="/" className="text-xl font-extrabold text-gray-700 hover:text-[#58e633] transition-colors">मीठो गाँस</Link>

        <div className='flex items-center gap-4'>
        <Link to="/recipes" className="px-4 py-2 text-gray-700 hover:text-[#58e633] font-extrabold transition-colors font-share">Recipes</Link>

        <Link to="/favorites" className="px-4 py-2 text-gray-700 hover:text-[#58e633] font-extrabold transition-colors font-share">Favorites</Link>

        <Link to="/mealplanner" className="px-4 py-2 text-gray-700 hover:text-[#58e633] font-extrabold transition-colors font-share">Meal Planner</Link>
        
        </div>
     </nav>
    );
}

export default NavBar