
import { useStats } from "../Hooks/useStats";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const animations = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes growX {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@keyframes pop {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
.animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
.animate-growX { transform-origin: left; animation: growX 0.7s ease-out forwards; }
.animate-pop { animation: pop 0.4s ease-out forwards; }
`;

const StatsDashboard = () => {
 const {calculateStats} = useStats();
 const [stats, setStats] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  setTimeout(() => {
    const calculatedStats = calculateStats();
    setStats(calculatedStats);
    setLoading(false);
  }, 500);
 }, []);

 if(loading){
  return(
   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
     <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#58e633] mb-4 mx-auto"></div>
     <p className="text-xl font-share text-gray-700">Loading your stats....</p>
    </div>
   </div>
  );
 }

 if(!stats){
  return(
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
     <div className="text-center">
      <p className="text-xl font-share text-gray-700">Unable to load stats...</p>
     </div>
    </div>
  );
 }

 const hasActivity = stats.overview.totalViewed > 0 || stats.overview.totalFavorites > 0 || stats.overview.totalPlanned > 0;

 return(
  <div className="min-h-screen bg-gray-50 py-8 animate-fadeIn">
    <style>{animations}</style>
   <div className="max-w-7xl mx-auto px-4">
    <div className="mb-8">
     <h1 className="text-4xl font-bold font-share mb-2">Your Cooking Journey📊</h1>
     <p className="text-gray-600 font-share">Track your recipe exploration, favorites, and cooking progress</p>
    </div>

    {!hasActivity ? (
     <EmptyState />
    ) : (
     <>
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard icon='👀' value={stats.overview.totalViewed} label='Recipes Viewed' color='blue' delay={0} />
      <StatCard icon='❤️' value={stats.overview.totalFavorites} label='Favorites' color='red' delay={100} />
      <StatCard icon='📅' value={stats.overview.totalPlanned} label='Planned Meals' color='green' delay={200} />
      <StatCard icon='📝' value={stats.overview.totalCustomized} label='Customized' color='purple' delay={300} />
     </div>

     {stats.overview.totalCookingSessions > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
       <StatCard icon='🍳' value={stats.overview.totalCookingSessions} label='Times Cooked' color='orange' delay={0} />
       <StatCard icon='✅' value={`${stats.overview.successRate}%`} label='Success Rate' color='green' delay={100} />
       <StatCard icon='📈' value={stats.overview.recentViews} label='Views (7 days)' color='blue' delay={200} />
      </div>
     )}

     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {Object.keys(stats.categories.favorite).length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
         <h2 className='text-2xl font-bold mb-4 font-share'>Favorite Categories</h2>
         <CategoryChart data={stats.categories.favorite} />
        </div>
      )}

      {Object.keys(stats.cuisines).length > 0 && (
       <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all'>
        <h2 className='text-2xl font-bold mb-4 font-share'>Cuisines Explored</h2>
        <CuisineChart data={stats.cuisines} />
       </div>
       )}
      </div>

      {Object.keys(stats.activity).length > 0 && (
       <div className='bg-white rounded-lg shadow-md p-6 mb-8 hover:shadow-xl transition-all'>
        <h2 className='text-2xl font-bold mb-4 font-share'>Recent Activity (30 days)</h2>
        <ActivityHeatmap data={stats.activity} />
       </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {stats.topRecipes.mostViewed.length > 0 && (
       <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all'>
        <h2 className='text-2xl font-bold mb-4 font-share'>Most Viewed Recipes</h2>
        <TopRecipesList recipes={stats.topRecipes.mostViewed} type='views' />
       </div>
      )}

       {stats.topRecipes.topRated.length > 0 && (
        <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all'>
         <h2 className='text-2xl font-bold mb-4 font-share'>Your Top Rated</h2>
         <TopRatedList recipes={stats.topRecipes.topRated} />
        </div>
        )}
      </div>
     </>


    )}
   </div>
  </div>
 )};

 const StatCard = ({ icon, value, label, color, delay=0 }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    red: 'bg-red-50 border-red-200 text-red-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600'
  };

  return (
   <div className={`${colorClasses[color]} border-2 rounded-lg p-6 text-center opacity-0 animate-slideUp will-change-transform hover:scale-105 hover:shadow-xl transition-all duration-300`} style={{ animationDelay: `${delay}ms` }} >
    <div className='text-4xl mb-2'>{icon}</div>
     <div className='text-3xl font-bold font-share mb-1'>{value}</div>
     <div className='text-sm font-share opacity-75'>{label}</div>
    </div>
    );
};

const CategoryChart = ({ data }) => {
 const maxValue = Math.max(...Object.values(data));
 const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
   <div className='space-y-3'>
    {sortedData.map(([category, count]) => {
    const percentage = (count / maxValue) * 100;
    return (
     <div key={category}>
      <div className='flex justify-between mb-1'>
      <span className='text-sm font-semibold font-share'>{category}</span>
      <span className='text-sm text-gray-600 font-share'>{count}</span>
     </div>
     <div className='w-full bg-gray-200 rounded-full h-3'>
     <div className='bg-[#58e633] h-3 rounded-full transition-all duration-700 hover:brightness-110 animate-growX' style={{ width: `${percentage}%` }}></div>
    </div>
   </div>
  )})}
 </div>
)};

const CuisineChart = ({ data }) => {
 const maxValue = Math.max(...Object.values(data));
 const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 8);

 const colors = ['#58e633', '#a7f1a0', '#9fcefb', '#fbbf24', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

 return (
  <div className='space-y-3'>
  {sortedData.map(([cuisine, count], index) => {
  const percentage = (count / maxValue) * 100;
  
  return (
   <div key={cuisine}>
   <div className='flex justify-between mb-1'>
    <span className='text-sm font-semibold font-share'>{cuisine}</span>
    <span className='text-sm text-gray-600 font-share'>{count}</span>
   </div>
   <div className='w-full bg-gray-200 rounded-full h-3'>
    <div className='h-3 rounded-full transition-all duration-700 hover:scale-x-105 origin-left animate-growX' style={{ width: `${percentage}%`, backgroundColor: colors[index % colors.length] }}></div>
    </div>
   </div>
   )})}
  </div>
 )}

 const ActivityHeatmap = ({ data }) => {
  const sortedDates = Object.entries(data).sort((a, b) => new Date(a[0]) - new Date(b[0])).slice(-14);const maxValue = Math.max(...Object.values(data));
  
  return (
  <div className='flex flex-wrap gap-2'>
   {sortedDates.map(([date, count]) => {
    const intensity = Math.min(Math.floor((count / maxValue) * 5), 5);
    const opacityLevels = ['opacity-10', 'opacity-30', 'opacity-50', 'opacity-70', 'opacity-90', 'opacity-100'];
    
    return (
     <div key={date} className='flex-1 min-w-[60px] text-center hover:scale-105 transition-transform' title={`${date}: ${count} views`}>
     <div className={`bg-[#58e633] ${opacityLevels[intensity]} h-16 rounded flex items-center justify-center mb-1 animate-pop`}>
      <span className='text-xs font-bold text-gray-800'>{count}</span>
     </div>
     <div className='text-xs text-gray-600 font-share'>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
     </div>
    </div>
    )})}
   </div>
   )}

   const TopRecipesList = ({ recipes, type }) => {
    return (
     <div className='space-y-3'>
      {recipes.map((recipe, index) => (
     <div key={recipe.recipeId} className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg  hover:bg-gray-100 hover:scale-[1.02] transition-all'>
      <div className='text-2xl font-bold text-gray-400 w-8'>{index + 1}</div>
       {recipe.image && (
       <img src={recipe.image} alt={recipe.name} className='w-12 h-12 rounded object-cover' /> )}
       <div className='flex-1'>
        <p className='font-semibold font-share'>{recipe.name}</p>
        <p className='text-xs text-gray-600 font-share'>{recipe.category}</p>
       </div>
       
       <div className='text-right'>
        <p className='font-bold text-[#58e633]'>{recipe.count}</p>
        <p className='text-xs text-gray-600 font-share'>views</p>
       </div>
      </div>
     ))}
    </div>
    )}

    const TopRatedList = ({ recipes }) => {
     return (
      <div className='space-y-3'>
      {recipes.map((item, index) => (
       <Link key={item.recipe.idMeal} to={`/recipe/${item.recipe.idMeal}`} className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 hover:scale-[1.02] transition-all' >
       <div className='text-2xl font-bold text-gray-400 w-8'>{index + 1}</div>
        <img src={item.recipe.strMealThumb} alt={item.recipe.strMeal} className='w-12 h-12 rounded object-cover' />
        <div className='flex-1'>
         <p className='font-semibold font-share'>{item.recipe.strMeal}</p>
         <p className='text-xs text-gray-600 font-share'>{item.recipe.strCategory}</p>
        </div>
        <div className='flex gap-1'>
         {Array.from({ length: item.rating }).map((_, i) => (
         <span key={i}>⭐</span>
        ))}
       </div></Link>
       ))}
     </div>
    )}

    const EmptyState = () => {
     return (
      <div className='bg-white rounded-lg shadow-md p-12 text-center'>
       <div className='text-6xl mb-4'>📊</div>
        <h2 className='text-2xl font-bold mb-3 font-share'>No Data Yet</h2>
        <p className='text-gray-600 mb-6 font-share'>Start exploring recipes to see your personalized stats and insights!</p>
        <Link to='/recipes' className='inline-block px-6 py-3 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] hover:scale-105 transition-all font-share'>Browse Recipes</Link>
       </div>
    )}

export default StatsDashboard;

