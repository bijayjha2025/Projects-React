
import { Link } from 'react-router-dom';
import { useComparison } from '../Hooks/useComparison';

const RecipeCard = ({ recipe }) => {
    const { addToComparison, isInComparison, removeFromComparison } = useComparison();
    const inComparison = isInComparison(recipe.idMeal);

    const handleCompareClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (inComparison) {
            removeFromComparison(recipe.idMeal);
        } else {
            addToComparison(recipe);
        }
    };

    return(
        <div className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative group'>
         <div className='absolute top-2 right-2 z-10'>
          <button onClick={handleCompareClick} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${ inComparison ? 'bg-[#58e633] text-white' : 'bg-white text-gray-700 hover:bg-[#a7f1a0]' }`} title={inComparison ? 'Remove from comparison' : 'Add to comparison'} >
                    
          {inComparison ? (
           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
           </svg> ) : (

          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg> )}
         </button>
        </div>

        <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110' />

        <div className='absolute top-3 left-3 bg-[#a7f1a0] px-3 py-1 rounded-full text-sm font-semibold'>
         {recipe.strCategory}
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