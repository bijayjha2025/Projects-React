
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    return(
        <div className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group'>
          <div className='relative overflow-hidden h-48'>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110' />
            <div className='absolute top-3 right-3 bg-[#a7f1a0] px-3 py-1 rounded-full text-sm font-semibold'>
                {recipe.strCategory}
            </div>
          </div>
            <div className='p-5'>
                <h3 className='text-xl font-bold mb-2 font-share text-gray-900'>{recipe.strMeal}</h3>
                <p className='text-gray-600 text-sm font-share mb-3'>{recipe.strArea} Cuisine</p>
                <Link to={`/recipe/${recipe.idMeal}`} className='inline-block px-4 py-2 bg-[#a7f1a0] text-black font-semibold rounded hover:bg-[#58e633] transition-colors'>View Recipe</Link>
            </div>
        </div>
    );
}

export default RecipeCard