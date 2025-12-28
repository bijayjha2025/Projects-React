import SearchBar from '../Components/SearchBar.jsx';
import RecipeCard from '../Components/RecipeCard.jsx';
import { useState } from 'react';

const Recipes = () => {
    const[recipes, setRecipes] = useState([]);
    const[loading, setLoading] = useState(false);

    const handleSearch = async (query) => {
        setLoading(true);
        try{
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            setRecipes(data.meals || []);
        }catch(error){
            console.error('Error fetching recipes:', error);
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className='py-8'>
            <h1 className='text-3xl font-bold text-center mb-8 font-share'>Search Recipes</h1>
            <SearchBar onSearch={handleSearch}/>
            {
                loading && (
                    <p className='text-center mt-8 font-share'>Loading...</p>
                )}
            
            <div>
                { recipes.map(recipe => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
            </div>

            {!loading && recipes.length === 0 && (
                <p>No recipes found. Try searching for something!</p>
            )}
        </div>
    );
}

export default Recipes;
