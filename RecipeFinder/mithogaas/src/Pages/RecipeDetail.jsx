import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useFavorites } from "../Hooks/useFavorites.jsx";
import { useMealPlanner } from "../Hooks/useMealPlanner.jsx";

const RecipeDetail = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDaySelector, setShowDaySelector] = useState(false);
    
    const {toggleFavorite, isFavorite} = useFavorites();
    const { addRecipeToDay, isRecipeInPlan } = useMealPlanner();
    

    useEffect(() => {
        const fetchRecipeDetail = async() => {
            setLoading(true);
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                setRecipe(data.meals ? data.meals[0] : null);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            } finally {
                setLoading(false);
            } };

        fetchRecipeDetail();
        }, [id]);

        const getIngredients = () => {
            if(!recipe) return [];
            const ingredients = [];
            for (let i=1; i<=20; i++){
                const ingredient= recipe[`strIngredient${i}`];
                const measure= recipe[`strMeasure${i}`];
                if(ingredient  && ingredient.trim()){
                    ingredients.push(`${measure} ${ingredient}`);
                }
            }
            return ingredients;
        }

        if(loading) {
            return(
             <div className="flex items-center justify-center min-h-screen">
              <p className="text-2xl font-share text-gray-700">Loading recipe...</p> </div>
            )}

        if (!recipe) {
            return (
             <div className="flex flex-col items-center justify-center min-h-screen">
              <p className="text-2xl font-share text-gray-700 mb-4">Recipe not found</p>
              <Link to="/recipes" className="px-6 py-3 bg-[#a7f1a0] text-black font-semibold rounded hover:bg-[#58e633] transition-colors font-share">Back to Recipes</Link>
            </div>
        );}

        const handleAddToMealPlan = (day) => {
          addRecipeToDay(day, recipe);
          setShowDaySelector(false);
        };

        const isRecipeFavorite = isFavorite(recipe.idMeal);
    return(
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link to="/recipes" className="inline-flex items-center text-gray-700 hover:text-[#58e633] mb-6 font-share font-semibold">← Back to Recipes</Link>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-96 object-cover"/>
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-4 font-share">{recipe.strMeal}</h1>

              <div className="flex flex-wrap gap-3 mb-6">
               <span className="px-4 py-2 bg-[#a7f1a0] text-black font-semibold rounded-full text-sm font-share">{recipe.strCategory}</span>
               <span className="px-4 py-2 bg-[#9fcefb] text-black font-semibold rounded-full text-sm font-share">{recipe.strArea}</span>
               {recipe.strTags && recipe.strTags.split(',').map((tag, index) => (
               <span key={index} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full text-sm font-share">{tag.trim()}</span>
               ))}
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 font-share">Ingredients</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                {getIngredients().map((ingredient, index) => (
                   <li key={index} className="flex items-center">
                   <span className="w-2 h-2 bg-[#58e633] rounded-full mr-3"></span>
                   <span className="text-gray-700 font-share">{ingredient}</span></li> ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 font-share">Instructions</h2>
                <div className="prose max-w-none">
                {recipe.strInstructions.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed font-share">{paragraph}</p>
                  )))}
                </div>
               </div>

               {recipe.strYoutube && (
                <div className="mb-8">
                 <h2 className="text-2xl font-bold mb-4 font-share">Video Tutorial</h2>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                    <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`} title="Recipe Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                 </div> )}

                <div className="flex flex-col gap-4 mt-8">
                 <div className="flex gap-4">
                 <button onClick={() => {
                  console.log('Button clicked!', recipe);
                  toggleFavorite(recipe);}}
                  className="flex-1 px-6 py-3 bg-[#a7f1a0] text-black font-semibold rounded hover:bg-[#58e633] transition-colors font-share flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor: isRecipeFavorite ? '#ef4444' : '#a7f1a0',
                    color: isRecipeFavorite ? 'white' : 'black' }}>
                    {isRecipeFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                 </button>
                 {recipe.strSource && (
                  <a href={recipe.strSource} target="_blank" rel="noopener noreferrer" className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded hover:bg-gray-300 transition-colors text-center font-share">View Source</a>
                  )}
                  </div>

                  <button onClick={()=> setShowDaySelector(!showDaySelector)} className="w-full px-6 py-3 bg-[#9fcefb] text-black font-semibold rounded hover:bg-[#7bb8e8] transition-colors font-share flex items-center justify-center gap-2">
                  <span>📅</span>
                  {isRecipeInPlan(recipe.idMeal) ? 'Added to Meal Plan' : 'Add to Meal Plan'}
                  </button>

                  {showDaySelector && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-gray-50 rounded-lg">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <button key={day} onClick={() => handleAddToMealPlan(day)} className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-[#58e633] hover:bg-[#a7f1a0] transition-colors font-share font-semibold text-sm">{day}</button> ))}
                  </div>
                )}
                 </div>
                </div>
              </div>
            </div>
    );
}

export default RecipeDetail;