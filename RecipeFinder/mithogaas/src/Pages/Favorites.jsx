
import { Link } from 'react-router-dom';
import { useFavorites } from '../Hooks/useFavorites.jsx';
import RecipeCard from '../Components/RecipeCard.jsx';

const Favorites = () => {
    const { favorites } = useFavorites();

    return(
     <div className='py-8 bg-gray-50 min-h-screen'>
      <div className='max-w-6xl mx-auto px-4'>
       <h1 className='text-3xl font-bold text-center mb-8 font-share text-gray-900'>Your Favorites</h1>
       {
         favorites.length === 0 ? (
          <div className='text-center py-16'>
           <p className='text-xl text-gray-600 font-share mb-6'>You haven't saved any recipes yet.</p>
           <Link to="/recipes" className='inline-block px-6 py-3 bg-[#a7f1a0] text-black font-semibold rounded hover:bg-[#58e633] transition-colors font-share'>Explore Recipes</Link>
          </div>
       ) : (
        <>
        <p className='text-center text-gray-600 font-share mb-8'>You have <span className='bg-[#58e633] font-extrabold'>{favorites.length}</span> saved {favorites.length === 1 ? 'recipe' : 'recipes'}</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
           ))}
        </div>
       </>
        )}
    </div>
  </div>
    );
}

export default Favorites;