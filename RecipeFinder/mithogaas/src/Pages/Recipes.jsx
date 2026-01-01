import SearchBar from '../Components/SearchBar.jsx';
import RecipeCard from '../Components/RecipeCard.jsx';
import { useState, useCallback, useEffect } from 'react';

const Recipes = () => {
    const[recipes, setRecipes] = useState([]);
    const[loading, setLoading] = useState(false);
    const[searched, setSearched] = useState(false);
    const[categories, setCategories] = useState([]);
    const[activeCategory, setActiveCategory] = useState('All');
    const[queryText, setQueryText] = useState('');

    useEffect(() => {
      const fetchCategories = async() =>{
        try{
          const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
          const data = await res.json();
          setCategories(data.categories || []);

        }catch(error){
          console.log('Failed to load categories', error);
        }
      };
      fetchCategories();
    }, []);

    const handleSearch = useCallback(async (query) => {

        if(!query.trim()) return;
        setQueryText(query);
        setLoading(true);
        setSearched(true);
        setActiveCategory('All');
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

    const filteredRecipes =
    activeCategory === 'All'
      ? recipes.filter(recipe => recipe.strCategory !== 'Beef')
      : recipes.filter(
          recipe => recipe.strCategory === activeCategory && recipe.strCategory !== 'Beef'
        );

    return(
     <div className='py-12 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 mb-12 text-center '>
       <h1 className='text-4xl md:text-5xl font-bold text-center mb-4 font-share text-gray-900'>Discover Your Next <span className='bg-[#a7f1a0] px-2'>Favorite Meal</span></h1>
       <p className='text-lg text-gray-600 font-share mb-8'>Search from thousands of delicious recipes from around the world</p>
            
      <SearchBar onSearch={handleSearch}/>
        <div className='mt-6 flex flex-wrap justify-center gap-3'>
         <span className='text-sm text-gray-500 font-share'>Try searching:</span>
         <button onClick={() => handleSearch('chicken')} className='px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-[#a7f1a0] transition-colors shadow-sm font-share'>Chicken</button>
         <button onClick={() => handleSearch('pasta')} className='px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-[#a7f1a0] transition-colors shadow-sm font-share'>Pasta</button>
         <button onClick={() => handleSearch('dessert')} className='px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-[#a7f1a0] transition-colors shadow-sm font-share'>Dessert</button>
         <button onClick={() => handleSearch('soup')} className='px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-[#a7f1a0] transition-colors shadow-sm font-share'>Soup</button>
        </div>
       </div>

      {recipes.length > 0 && (
       <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => setActiveCategory('All')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${activeCategory === 'All' ? 'bg-[#58e633] text-black' : 'bg-white text-gray-700 hover:bg-[#a7f1a0]'}`}>All</button>

          {categories.filter(cat => cat.strCategory !== 'Beef').map(cat=> (
            <button key={cat.idCategory} onClick={() => setActiveCategory(cat.strCategory)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${activeCategory === cat.strCategory ? 'bg-[#58e633] text-black' : 'bg-white text-gray-700 hover:bg-[#a7f1a0]'}`}>{cat.strCategory}</button>
            ))}
          </div>
        </div>
      )}

       { loading && (
         <div className='flex flex-col items-center justify-center py-16'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-[#58e633] mb-4'></div>
            <p className='text-xl font-share text-gray-700'>Searching recipes...</p>
          </div>
        )}

        { !loading && filteredRecipes.length > 0 && (
         <div className='max-w-6xl mx-auto px-4'>
          <p className='text-center text-gray-600 font-share mb-8 text-lg'> Showing <span className='font-bold text-[#58e633]'>{filteredRecipes.length}</span>{''} recipes {activeCategory !== 'All' && (
            <>in <span className='font-semibold'>{activeCategory}</span></>
          )}</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

        { !loading && searched && filteredRecipes.length === 0 && (
         <div className='max-w-2xl mx-auto px-4 text-center py-16'>
          <div className='text-6xl mb-6'>🔍</div>
           <h2 className='text-3xl font-bold text-gray-800 mb-4 font-share'>No Recipes Found</h2>
           <p className='text-lg text-gray-600 font-share mb-6'>We couldn't find any recipes matching your search. Try different keywords or browse our suggestions above.</p>
            <div className='bg-[#9fcefb] rounded-lg p-6 text-left'>
             <h3 className='font-bold text-lg mb-3 font-share'>Search Tips:</h3>
             <ul className='space-y-2 text-gray-700 font-share'>
              <li className='flex items-start'>
                <span className='text-[#58e633] mr-2'>✓</span>
                <span>Try searching by ingredient (e.g., "chicken")</span>
              </li>
              <li className='flex items-start'>
                <span className='text-[#58e633] mr-2'>✓</span>
                <span>Search by cuisine type (e.g., "Italian", "Chinese")</span>
              </li>
              <li className='flex items-start'>
                <span className='text-[#58e633] mr-2'>✓</span>
                <span>Look for dish names (e.g., "pizza", "curry")</span>
              </li>
              <li className='flex items-start'>
                <span className='text-[#58e633] mr-2'>✓</span>
                <span>Keep it simple - shorter searches work better!</span>
              </li>
             </ul>
             </div>
            </div>
            )}

        {!loading && !searched && (
         <div className='max-w-3xl mx-auto px-4 text-center py-16'>
          <div className='text-7xl mb-6'>👨‍🍳</div>
            <h2 className='text-2xl font-bold text-gray-800 mb-3 font-share'>Ready to Cook Something Amazing?</h2>
            <p className='text-lg text-gray-600 font-share mb-8'>Start by typing a recipe name, ingredient, or cuisine in the search bar above</p>
          </div>
            )}
        </div>
    );
}

export default Recipes;