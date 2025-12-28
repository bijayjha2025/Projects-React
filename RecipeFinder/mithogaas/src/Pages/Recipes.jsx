import SearchBar from '../Components/SearchBar.jsx';
import RecipeCard from '../Components/RecipeCard.jsx';
import { useState, useCallback } from 'react';

const Recipes = () => {
    const[recipes, setRecipes] = useState([]);
    const[loading, setLoading] = useState(false);

    const handleSearch = useCallback(async (query) => {
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
    }, []);

    return(
        <div className='py-8'>
            <h1 className='text-3xl font-bold text-center mb-8 font-share'>Search Recipes</h1>
            <SearchBar onSearch={handleSearch}/>
            {
                loading && (
                    <p className='text-center mt-8 font-share'>Loading...</p>
                )}
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4 mt-8">
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
