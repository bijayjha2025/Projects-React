
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useMealPlanner } from "../Hooks/useMealPlanner";

const MealPlanner = () => {
    const { mealPlan, removeRecipeFromDay, clearDay, clearWeek, getTotalMeals } = useMealPlanner();
    const [showShoppingList, setShowShoppingList]= useState(false);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return(
     <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className='text-center mb-8'>
         <h1 className='text-4xl md:text-5xl font-bold mb-4 font-share text-gray-900'>Your Weekly <span className='bg-[#a7f1a0] px-2'>Meal Plan</span></h1>
         <p className='text-lg text-gray-600 font-share mb-6'>Plan your meals for the week and generate a shopping list</p>

         <div className='flex flex-wrap justify-center gap-4 mb-6'>
          <div className='bg-white px-6 py-3 rounded-lg shadow-md'>
           <p className='text-sm text-gray-600 font-share'>Total Meals Planned</p>
           <p className='text-3xl font-bold text-[#58e633] font-share'>{getTotalMeals()}</p>
          </div>
          <Link to="/recipes" className='px-6 py-3 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors font-share flex items-center gap-2'>
           <span>➕</span> Add Recipes</Link>
          <button onClick={() => setShowShoppingList(!showShoppingList)} className='px-6 py-3 bg-[#9fcefb] text-black font-semibold rounded-lg hover:bg-[#7bb8e8] transition-colors font-share flex items-center gap-2'>
           <span>🛒</span> {showShoppingList ? 'Hide' : 'View'} Shopping List</button>

           {getTotalMeals() > 0 && (
             <button onClick={clearWeek} className='px-6 py-3 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors font-share'>Clear Week</button>)}
            </div>
        </div>

        {showShoppingList && <ShoppingList onClose={() => setShowShoppingList(false)} />}
         {getTotalMeals() === 0 ? (
          <div className='text-center py-16 bg-white rounded-lg shadow-md'>
            <div className='text-6xl mb-4'>📅</div>
             <h2 className='text-2xl font-bold text-gray-800 mb-3 font-share'>Your Meal Plan is Empty</h2>
             <p className='text-gray-600 font-share mb-6'>Start planning your week by adding recipes to each day!</p>
             <Link to="/recipes" className='inline-block px-6 py-3 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors font-share'>Browse Recipes</Link>
            </div>) :
            (
             <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {daysOfWeek.map(day => (
               <DayCard key={day} day={day} recipes={mealPlan[day]} onRemove={(recipeId) => removeRecipeFromDay(day, recipeId)}onClear={() => clearDay(day)}/>
               ))}
              </div> )}
            </div>
        </div>
    );
}

const DayCard = ({ day, recipes, onRemove, onClear }) => {
  return(
   <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow'>
    <div className='bg-[#a7f1a0] px-4 py-3 flex justify-between items-center'>
     <h3 className='text-xl font-bold font-share text-gray-900'>{day}</h3>
     {recipes.length > 0 && (
     <button onClick={onClear} className='text-sm text-red-600 hover:text-red-800 font-semibold font-share' title='Clear day'>Clear</button>)}
    </div>

    <div className='p-4 min-h-[200px]'>
     {recipes.length === 0 ? (
     <div className='flex flex-col items-center justify-center h-full text-gray-400 py-8'>
      <span className='text-4xl mb-2'>🍽️</span>
      <p className='text-sm font-share'>No meals planned</p>
     </div>) 
     
     : (
      <div className='space-y-3'>
       {recipes.map((recipe, index) => (
       <div key={`${recipe.idMeal}-${index}`} className='border border-gray-200 rounded-lg p-3 hover:border-[#58e633] transition-colors group'>
       <div className='flex gap-3'>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-16 h-16 object-cover rounded'/>
        <div className='flex-1 min-w-0'>
         <Link to={`/recipe/${recipe.idMeal}`} className='font-semibold font-share text-sm text-gray-900 hover:text-[#58e633] block truncate'>{recipe.strMeal}</Link>
         <p className='text-xs text-gray-600 font-share'>{recipe.strCategory}</p>
        </div>
        <button onClick={() => onRemove(recipe.idMeal)} className='text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity' title='Remove'>✕</button>
       </div>
      </div>
      ))}
     </div>
    )}
   </div>
  </div>
    );
};

const ShoppingList = ({ onClose }) => {
  const { generateShoppingList } = useMealPlanner();
  const shoppingList = generateShoppingList();

  const handlePrint = () => {
    window.print();
  };

  return(
   <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4' onClick={onClose}>
    <div className='bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col' onClick={(e) => e.stopPropagation()}>
     <div className='bg-[#a7f1a0] px-6 py-4 flex justify-between items-center'>
      <h2 className='text-2xl font-bold font-share text-gray-900'>🛒 Shopping List</h2>
      <button onClick={onClose} className='text-gray-700 hover:text-gray-900 text-2xl font-bold'>✕</button>
     </div>

    <div className='p-6 overflow-y-auto flex-1'>
     {shoppingList.length === 0 ? (
     <div className='text-center py-8'>
     <p className='text-gray-600 font-share'>Add recipes to your meal plan to generate a shopping list!</p>
     </div>) :
     
     (
     <>
      <p className='text-gray-600 font-share mb-4'>You need <span className='font-bold text-[#58e633]'>{shoppingList.length}</span> ingredients for your weekly meals</p>
      <div className='space-y-2'>
      {shoppingList.sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => (
      <div key={index} className='flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
       <input type='checkbox' className='mt-1 w-4 h-4 cursor-pointer'/>
       <div className='flex-1'>
        <p className='font-semibold font-share text-gray-900'>{item.name}</p>
        <p className='text-sm text-gray-600 font-share'>{item.measure}</p>
       </div>
      </div>
      ))}
     </div>
     </>
     )}
    </div>

    {shoppingList.length > 0 && (
     <div className='bg-gray-50 px-6 py-4 flex gap-3'>
      <button onClick={handlePrint} className='flex-1 px-6 py-3 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors font-share'>🖨️ Print List</button>
      <button onClick={onClose} className='px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors font-share'>Close</button>
     </div>
    )}
   </div>
  </div>
    );
};

export default MealPlanner;