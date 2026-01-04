
import { Link } from 'react-router-dom';
import { useFavorites } from '../Hooks/useFavorites.jsx';
import RecipeCard from '../Components/RecipeCard.jsx';
import { useState, useMemo } from 'react';

const Favorites = () => {
    const { favorites } = useFavorites();
    const [sortBy, setSortBy] = useState('default');
    const [filterCategory, setFilterCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const categories = useMemo(() => {
       const cats = [...new Set(favorites.map(recipe => recipe.strCategory))];
       return cats.sort();
    }, [favorites]);

    const processedFavorites = useMemo(() => {
      let filtered = favorites;

      if (filterCategory !== 'All') {
        filtered = filtered.filter(recipe => recipe.strCategory === filterCategory);
       }

      if (searchQuery.trim()) {
        filtered = filtered.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.strArea.toLowerCase().includes(searchQuery.toLowerCase())
        ); 
       }

       const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case 'a-z':
              return a.strMeal.localeCompare(b.strMeal);
            case 'z-a':
              return b.strMeal.localeCompare(a.strMeal);
            case 'category':
              return a.strCategory.localeCompare(b.strCategory);
            default:
              return 0;
            }
        });

        return sorted;
    }, [favorites, filterCategory, searchQuery, sortBy]);

    const handleClearAll = () => {
      console.log('Clearing all favorites');
      setShowClearConfirm(false);
    };

    const categoryButtonClasses = (isActive) => `
      px-4 py-1.5 rounded-full text-sm font-semibold font-share transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#58e633] focus:ring-offset-2 ${isActive ? 'bg-[#58e633] text-black shadow-md scale-105' : 'bg-white text-gray-700 hover:bg-[#a7f1a0] hover:scale-105 shadow-sm'
        }
    `;

    return(
     <div className='py-12 bg-gray-50 min-h-screen'>
      <div className='max-w-6xl mx-auto px-4'>
       <div className='text-center mb-8 animate-fade-in-up'>
        <h1 className='text-4xl md:text-5xl font-bold text-center mb-8 font-share text-gray-900'>Your <span className='bg-[#a7f1a0] px-2 inline-block animate-highlight'>Favorite</span> Recipes</h1>
        
        <p className='text-lg text-gray-600 font-share'>
        { favorites.length === 0 ? 'Start building your collection of delicious recipes' : 
         <>
          You have <span className='bg-[#a7f1a0] font-extrabold'>{favorites.length}</span> saved {favorites.length === 1 ? 'recipe' : 'recipes'}
         </> 
         }
         </p>
        </div>

        { favorites.length === 0 ? (
          <div className='text-center py-16 animate-fade-in-up animation-delay-200'>
           <div className='text-7xl mb-6 animate-float'>❤️</div>
            <h2 className='text-2xl font-bold text-gray-800 mb-3 font-share'>No Favorites Yet</h2>
            <p className='text-lg text-gray-600 font-share mb-8 max-w-md mx-auto'>Start exploring recipes and click the heart icon to save your favorites here!</p>
            <Link to="/recipes" className='inline-block px-8 py-3 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] hover:scale-105 transition-all shadow-md font-share'>🔍 Explore Recipes</Link>
           </div> )
           : (
            <>
            <div className='mb-8 animate-fade-in-up animation-delay-100'>
             <div className='max-w-2xl mx-auto mb-6'>
              <div className='relative'>
               <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search your favorites...' className='w-full px-6 py-3 rounded-full border-2 border-gray-300 focus:border-[#58e633] focus:outline-none transition-colors font-share pr-12'/>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors' aria-label='Clear search'>✕</button>
                )}
              </div>
             </div>

                
            {categories.length > 0 && (
              <div className='flex flex-wrap justify-center gap-3 mb-6'>
               <button onClick={() => setFilterCategory('All')}className={categoryButtonClasses(filterCategory === 'All')}>All ({favorites.length})</button>

               {categories.map((category, index) => (
               <button key={category} onClick={() => setFilterCategory(category)} className={categoryButtonClasses(filterCategory === category)} style={{ animationDelay: `${index * 30}ms` }}>{category} ({favorites.filter(f => f.strCategory === category).length})</button>
               ))}
             </div>
            )}

            <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
             <div className='flex items-center gap-3'>
              <label htmlFor='sort-favorites' className='text-gray-700 font-share font-semibold text-sm'>Sort by:</label>
               <select id='sort-favorites' value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-share font-semibold text-sm focus:outline-none focus:border-[#58e633] cursor-pointer hover:border-[#a7f1a0] transition-colors'aria-label='Sort favorites by'>
                <option value='default'>Recently Added</option>
                <option value='a-z'>Name (A → Z)</option>
                <option value='z-a'>Name (Z → A)</option>
                <option value='category'>Category</option>
               </select>
             </div>

            <button onClick={() => setShowClearConfirm(true)} className='px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-share'>🗑️ Clear All</button>
           </div>
          </div>

         {(searchQuery || filterCategory !== 'All') && (
          <div className='mb-6 text-center animate-fade-in'>
           <p className='text-gray-600 font-share'>Showing <span className='font-bold text-[#58e633]'>{processedFavorites.length}</span> of {favorites.length} recipes</p>
          </div>
          )}

         {processedFavorites.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           {processedFavorites.map((recipe, index) => (
            <div key={recipe.idMeal} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }} >
             <RecipeCard recipe={recipe} />
             </div>
            ))}
          </div>
          ) : (
         
         <div className='text-center py-16 animate-fade-in-up'>
          <div className='text-6xl mb-6'>🔍</div>
           <h3 className='text-2xl font-bold text-gray-800 mb-3 font-share'>No Recipes Found</h3>
           <p className='text-lg text-gray-600 font-share mb-6'>Try adjusting your filters or search query</p>
           <button onClick={() => { setSearchQuery(''); setFilterCategory('All'); }} className='px-6 py-2 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors font-share'>Reset Filters</button>
          </div>
          )}
          </>
          )}

         {showClearConfirm && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in'>
            <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-up'>
             <div className='text-center mb-6'>
              <div className='text-5xl mb-4'>⚠️</div>
               <h3 className='text-2xl font-bold text-gray-900 mb-2 font-share'>Clear All Favorites?</h3>
               <p className='text-gray-600 font-share'>This will remove all {favorites.length} recipes from your favorites. This action cannot be undone.</p>
               </div>
              
              <div className='flex gap-3'>
                <button onClick={() => setShowClearConfirm(false)} className='flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors font-share'>Cancel</button>
                <button onClick={handleClearAll} className='flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors font-share'>Clear All</button>
              </div>
            </div>
            </div> )}

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

            @keyframes scaleUp {
             from { opacity: 0; transform: scale(0.9); }
             to { opacity: 1; transform: scale(1); }
            }

            .animate-fade-in-up {
              animation: fadeInUp 0.6s ease-out both; }

            .animate-fade-in {
              animation: fadeIn 0.5s ease-out both; }

            .animate-highlight {
              animation: highlight 2s ease-in-out infinite; }

            .animate-float {
              animation: float 3s ease-in-out infinite;  }

            .animate-scale-up {
              animation: scaleUp 0.3s ease-out both;  }

            .animation-delay-100 {
              animation-delay: 0.1s; }

            .animation-delay-200 {
              animation-delay: 0.2s; }
            `}
            </style>

        </div>
        </div>
    );
}

export default Favorites;