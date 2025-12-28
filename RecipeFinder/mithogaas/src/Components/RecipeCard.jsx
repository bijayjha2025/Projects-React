
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    return(
        <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow'>
            <img src='recipe.strMealThumb' alt='recipe.strMeal' className='w-full h-48 object-cover' />
            <div className='p-4'>
                <h3 className='text-xl font-bold mb-2 font-share'>{recipe.strMeal}</h3>
                <p>{recipe.strCategory}.{recipe.strArea}</p>
                <Link to={`/recipe/${recipe.idMeal}`} className='inline-block px-4 py-2 bg-[#a7f1a0] text-black font-semibold rounded hover:bg-[#58e633] transition-colors'>View Recipe</Link>
            </div>
        </div>
    );
}

export default RecipeCard