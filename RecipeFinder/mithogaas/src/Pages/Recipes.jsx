import SearchBar from '../Components/SearchBar.jsx';
import RecipeCard from '../Components/RecipeCard.jsx';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { RecipeGridSkeleton, CategoryButtonsSkeleton } from '../Components/Skeletons.jsx';
import backgroundImage from '../assets/Images/ImageForRecipe.jpg';

const Recipes = () => {
    const[recipes, setRecipes] = useState([]);
    const[loading, setLoading] = useState(false);
    const[searched, setSearched] = useState(false);
    const[categories, setCategories] = useState([]);
    const[activeCategory, setActiveCategory] = useState('All');
    const[queryText, setQueryText] = useState('');
    const[sortOption, setSortOption] = useState('default');
    const[categoriesLoading, setCategoriesLoading] = useState(true);
    const[error, setError] = useState(null);

    const EXCLUDED_CATEGORIES = ['Beef'];

    useEffect(() => {
      const fetchCategories = async() =>{
        try{
          const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
          const data = await res.json();
          setCategories(data.categories || []);

        }catch(error){
          console.log('Failed to load categories', error);
        }finally {
          setCategoriesLoading(false);
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
        setError(null);
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

    const handleClear = () => {
      setRecipes([]);
      setSearched(false);
      setQueryText('');
      setActiveCategory('All');
      setError(null);
    };

    const filteredRecipes = useMemo(() =>{
      return recipes.filter(recipe => !EXCLUDED_CATEGORIES.includes(recipe.strCategory))
      .filter(recipe => activeCategory === 'All' || recipe.strCategory === activeCategory);
    }, [recipes, activeCategory]);

    const sortedRecipes = useMemo(() => {
       return [...filteredRecipes].sort((a,b) => {
      switch (sortOption) {
        case 'a-z':
          return a.strMeal.localeCompare(b.strMeal);

        case 'z-a':
          return b.strMeal.localeCompare(a.strMeal);
        
        case 'default':
        default:
          return 0;
      } });
    }, [filteredRecipes, sortOption]);

    const categoryButtonClasses = (isActive) => `
      px-4 py-1.5 rounded-full text-sm font-semibold font-share transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-[#58e633] focus:ring-offset-2
      ${isActive 
        ? 'bg-[#58e633] text-black shadow-md scale-105' 
        : 'bg-white text-gray-700 hover:bg-[#a7f1a0] hover:scale-105 shadow-sm'
      }
    `;

    return(
     <div className='py-12 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 mb-12 text-center animate-fade-in-up'>
       <h1 className='text-4xl md:text-5xl font-bold text-center mb-4 font-share text-gray-900'>Discover Your Next <span className='bg-[#a7f1a0] px-2 inline-block animate-highlight'>Favorite Meal</span></h1>
       <p className='text-lg text-gray-600 font-share mb-8 animate-fade-in-up animation-delay-100'>Search from thousands of delicious recipes from around the world</p>

       <div className="animate-fade-in-up animation-delay-200">
        <SearchBar onSearch={handleSearch}/>
       </div>

        <div className='mt-6 flex flex-wrap justify-center gap-3 items-center animate-fade-in-up animation-delay-300'>
         <span className='text-sm text-gray-500 font-share'>Try searching:</span>
         <button onClick={() => handleSearch('chicken')} className='px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-[#a7f1a0] hover:scale-105 transition-all shadow-sm font-share'>Chicken</button>
         <button onClick={() => handleSearch('pasta')} className='px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-[#a7f1a0] hover:scale-105 transition-all shadow-sm font-share'>Pasta</button>
         <button onClick={() => handleSearch('dessert')} className='px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-[#a7f1a0] hover:scale-105 transition-all shadow-sm font-share'>Dessert</button>
         <button onClick={() => handleSearch('soup')} className='px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-[#a7f1a0] hover:scale-105 transition-all shadow-sm font-share'>Soup</button>
        </div>

        {searched && (
          <button onClick={handleClear} className='mt-4 text-sm text-gray-600 hover:text-[#58e633] font-semibold transition-colors font-share flex items-center gap-2 mx-auto animate-fade-in'><span>✕</span> Clear Search</button> )}
       </div>

       {error && (
        <div className='max-w-6xl mx-auto px-4 mb-6 animate-fade-in'>
          <div className='bg-red-100 border-2 border-red-300 text-red-700 p-4 rounded-lg flex items-center gap-3'>
            <span className='text-2xl'>⚠️</span>
            <p className='font-share'>{error}</p>
          </div>
        </div>
      )}

      {recipes.length > 0 && (
       <div className="max-w-6xl mx-auto px-4 mb-8 animate-fade-in-up">
        {categoriesLoading ? (
          <CategoryButtonsSkeleton count={10} />
        ) : (
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => setActiveCategory('All')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${activeCategory === 'All' ? 'bg-[#58e633] text-black' : 'bg-white text-gray-700 hover:bg-[#a7f1a0]'}`}>All</button>

          {categories.filter(cat => !EXCLUDED_CATEGORIES.includes(cat.strCategory)).map((cat, index) => (
            <button key={cat.idCategory} onClick={() => setActiveCategory(cat.strCategory)} className={categoryButtonClasses(activeCategory === cat.strCategory)} style={{ animationDelay: `${index * 30}ms` }}>{cat.strCategory}</button>
            ))}
          </div>
        )}
        </div>
      )}

       { loading && (
         <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center mb-6 animate-pulse'>
            <p className='text-lg font-semibold text-gray-600 font-share'>🔍 Searching for delicious recipes...</p>
          </div>
          <RecipeGridSkeleton count={6} />
         </div>
        )}

        { !loading && sortedRecipes.length > 0 && (
         <div className='max-w-6xl mx-auto px-4'>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 animate-fade-in-up">
          <p className='text-center sm:text-left text-gray-600 font-share text-lg'> Showing <span className='font-bold text-[#58e633]'>{sortedRecipes.length}</span>{activeCategory !== 'All' && (
            <>in <span className='font-semibold'>{activeCategory}</span></>
          )}</p>

        <div className='flex items-center gap-3'>
          <label htmlFor='sort' className='text-gray-700 font-share font-semibold text-sm'>Sort by:</label>
          <select id='sort' value={sortOption} onChange={(e) => setSortOption(e.target.value)} className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-share font-semibold text-sm focus:outline-none focus:border-[#58e633] cursor-pointer hover:border-[#a7f1a0] transition-colors' aria-label="Sort recipes by">
            <option value='default'>Default</option>
            <option value='a-z'>A → Z</option>
            <option value='z-a'>Z → A</option>
          </select>
        </div>
       </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedRecipes.map((recipe, index) => (
              <div key={recipe.idMeal} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }} >
              <RecipeCard recipe={recipe} />
            </div>
            ))}
          </div>
        </div>
      )}

        { !loading && searched && filteredRecipes.length === 0 && (
         <div className='max-w-2xl mx-auto px-4 text-center py-16 animate-fade-in-up'>
          <div className='text-6xl mb-6 animate-bounce'>🔍</div>
           <h2 className='text-3xl font-bold text-gray-800 mb-4 font-share'>No Recipes Found</h2>
           <p className='text-lg text-gray-600 font-share mb-6'>We couldn't find any recipes matching "{queryText}". Try different keywords or browse our suggestions above.</p>
            <div className='bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-left shadow-md'>
             <h3 className='font-bold text-lg mb-3 font-share text-gray-900'>💡 Search Tips:</h3>
             <ul className='space-y-2 text-gray-700 font-share'>
              <li className='flex items-start'>
                <span className='text-[#58e633] mr-2 text-xl'>✓</span>
                <span>Try searching by ingredient (e.g., "chicken")</span>
              </li>
              <li className='flex items-start'>
                <span className='text-[#58e633] mr-2 text-xl'>✓</span>
                <span>Search by cuisine type (e.g., "Italian", "Chinese")</span>
              </li>
              <li className='flex items-start'>
                <span className='text-[#58e633] mr-2 text-xl'>✓</span>
                <span>Look for dish names (e.g., "pizza", "curry")</span>
              </li>
              <li className='flex items-start'>
                <span className='text-[#58e633] mr-2 text-xl'>✓</span>
                <span>Keep it simple - shorter searches work better!</span>
              </li>
             </ul>
             </div>
            </div>
            )}

        {!loading && !searched && (
         <div className='max-w-3xl mx-auto px-4 text-center py-16'>
          <div className='mb-8 rounded-2xl overflow-hidden shadow-2xl animate-fadeSlideUp'>
            <img src= {backgroundImage} alt='unprepared meals' className='w-full h-80 object-cover' />
          </div>

            <h2 className='text-2xl font-bold text-gray-800 mb-3 font-share'>Ready to Cook Something Amazing?</h2>
            <p className='text-lg text-gray-600 font-share mb-8'>Start by typing a recipe name, ingredient, or cuisine in the search bar above</p>
          </div>
            )}
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes highlight {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out both;
          }

          .animate-fade-in {
            animation: fadeIn 0.5s ease-out both;
          }

          .animate-highlight {
            animation: highlight 2s ease-in-out infinite;
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animation-delay-100 {
            animation-delay: 0.1s;
          }

          .animation-delay-200 {
            animation-delay: 0.2s;
          }

          .animation-delay-300 {
            animation-delay: 0.3s;
          }
          
          @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeSlideUp {
            animation: fadeSlideUp 0.8s ease-out;
          }
        `}</style>

        </div>
    );
}

export default Recipes;