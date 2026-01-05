import { useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import { useMealPlanner } from "../Hooks/useMealPlanner";
import { usePrint } from "../Hooks/usePrint";
import backgroundImage from '../assets/Images/Mixed.jpg'

const MealPlanner = () => {
    const { mealPlan, removeRecipeFromDay, clearDay, clearWeek, getTotalMeals } = useMealPlanner();
    const [showShoppingList, setShowShoppingList]= useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const daysWithMeals = useMemo(() => {
        return daysOfWeek.filter(day => mealPlan[day].length > 0).length;
    }, [mealPlan]);

    return(
     <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
       <div className='text-center mb-8 animate-fade-in-up'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 font-share text-gray-900'>Your Weekly <span className='bg-[#a7f1a0] px-2 animate-highlight inline-block'>Meal Plan</span></h1>
        <p className='text-lg text-gray-600 font-share mb-6'>Plan your meals for the week and generate a shopping list</p>

        <div className='flex flex-wrap justify-center gap-4 mb-6 animate-fade-in-up animation-delay-100'>
         <div className='bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1'>
          <p className='text-sm text-gray-600 font-share'>Total Meals Planned</p>
          <p className='text-3xl font-bold text-[#58e633] font-share'>{getTotalMeals()}</p>
         </div>

         <div className='bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1'>
          <p className='text-sm text-gray-600 font-share'>Days Planned</p>
          <p className='text-3xl font-bold text-[#a7f1a0] font-share'>{daysWithMeals}/7</p>
          </div>

          <div className='flex flex-wrap justify-center gap-4 mb-6 animate-fade-in-up animation-delay-200'>
          <Link to="/recipes" className='px-6 py-3 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] hover:scale-105 transition-all shadow-md font-share flex items-center gap-2'>
           <span>➕</span> Add Recipes</Link>

           {getTotalMeals() > 0 && (
            <>
            <button onClick={() => setShowShoppingList(!showShoppingList)} className='px-6 py-3 bg-[#9fcefb] text-blue-700 font-semibold rounded-lg hover:bg-[#7bb8e8] hover:scale-105 transition-all shadow-md font-share flex items-center gap-2'>
            <span>🛒</span> {showShoppingList ? 'Hide' : 'View'} Shopping List</button>

            <button onClick={() => setShowClearConfirm(true)} className='px-6 py-3 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 hover:scale-105 transition-all shadow-md font-share'>Clear Week</button>
            </>
            )}
            </div>
          </div>
        </div>

        {showShoppingList && <ShoppingList onClose={() => setShowShoppingList(false)} />}

         {getTotalMeals() === 0 ? (
          <div className='max-w-3xl text-center py-16 mx-auto px-4'>
           <div className='mb-8 rounded-2xl overflow-hidden shadow-2xl animate-fadeSlideUp'>
             <img src= {backgroundImage} alt='mixedimage' className='w-full h-80 object-cover' />
           </div>

            <h2 className='text-2xl font-bold text-gray-800 mb-3 font-share'>Your Meal Plan is Empty</h2>
            <p className='text-gray-600 font-share mb-6'>Start planning your week by adding recipes to each day!</p>
            <Link to="/recipes" className='inline-block px-6 py-3 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] hover:scale-105 transition-all shadow-md font-share'>Browse Recipes</Link>
           </div>) :
            (
           <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {daysOfWeek.map((day, index) => (
            <DayCard key={day} day={day} recipes={mealPlan[day]} onRemove={(recipeId) => removeRecipeFromDay(day, recipeId)}onClear={() => clearDay(day)} index={index}/>
            ))}
           </div> )}

          {showClearConfirm && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in'>
           <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-up'>
            <div className='text-center mb-6'>
              <div className='text-5xl mb-4'>⚠️</div>
               <h3 className='text-2xl font-bold text-gray-900 mb-2 font-share'>Clear Entire Week?</h3>
               <p className='text-gray-600 font-share'>This will remove all {getTotalMeals()} meals from your weekly plan. This action cannot be undone.</p>
              </div>
              
            <div className='flex gap-3'>
             <button onClick={() => setShowClearConfirm(false)} className='flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors font-share'>Cancel</button>
             <button onClick={() => { clearWeek(); setShowClearConfirm(false); }} className='flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors font-share'>Clear All</button>
            </div>
           </div>
          </div>
        )}

    <style>
     {`
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

      .animate-scale-up {
        animation: scaleUp 0.3s ease-out both;
      }

      .animation-delay-100 {
        animation-delay: 0.1s;
      }

     .animation-delay-200 {
        animation-delay: 0.2s;
      }
      
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .animate-fadeSlideUp {
        animation: fadeSlideUp 0.8s ease-out;
      }

      @media print {
       .no-print {
      display: none !important;
      }
     }
    `}
    </style>

  </div>
 </div>
    );
}

const DayCard = ({ day, recipes, onRemove, onClear, index }) => {
  return(
   <div className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up' style={{ animationDelay: `${index * 80}ms` }}>
    <div className='bg-[#a7f1a0] px-4 py-3 flex justify-between items-center'>
     <h3 className='text-xl font-bold font-share text-gray-900'>{day}</h3>
     {recipes.length > 0 && (
     <button onClick={onClear} className='text-sm text-red-600 hover:text-red-800 hover:scale-110 transition-all font-semibold font-share' title='Clear day'>Clear</button>)}
    </div>

    <div className='p-4 min-h-[200px]'>
     {recipes.length === 0 ? (
     <div className='flex flex-col items-center justify-center h-full text-gray-400 py-8'>
      <span className='text-4xl mb-2'>🍽️</span>
      <p className='text-sm font-share'>No meals planned</p>
     </div>) 
     
     : (
      <div className='space-y-3'>
       {recipes.map((recipe, recipeIndex) => (
       <div key={`${recipe.idMeal}-${recipeIndex}`} className='border border-gray-200 rounded-lg p-3 hover:border-[#58e633] hover:shadow-md transition-all duration-300 group animate-fade-in' style={{ animationDelay: `${recipeIndex * 100}ms` }} >
       <div className='flex gap-3'>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-16 h-16 object-cover rounded transition-transform duration-300 group-hover:scale-110'/>
        <div className='flex-1 min-w-0'>
         <Link to={`/recipe/${recipe.idMeal}`} className='font-semibold font-share text-sm text-gray-900 hover:text-[#58e633] block truncate transition-colors'>{recipe.strMeal}</Link>
         <p className='text-xs text-gray-600 font-share'>{recipe.strCategory}</p>
        </div>
        <button onClick={() => onRemove(recipe.idMeal)} className='text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-all hover:scale-125' title='Remove'>✕</button>
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
  const { generateShoppingList, mealPlan } = useMealPlanner();
  const shoppingList = generateShoppingList();
  const { handlePrint, handleExportCSV, copyToClipboard } = usePrint();
  const [checkedItems, setCheckedItems] = useState(new Set());

  const toggleItem = (index) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const handlePrintClick = () => {
    handlePrint(shoppingList, mealPlan);
  }
    
    const handleExportCSVClick = () => {
    handleExportCSV(shoppingList);
  };

  const handleCopyClick = async () => {
    await copyToClipboard(shoppingList, checkedItems);
    alert('Shopping list copied to clipboard!');
  };
    
  return(
   <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 no-print animate-fade-in' onClick={onClose}>
    <div className='bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-scale-up' onClick={(e) => e.stopPropagation()}>
     <div className='bg-[#a7f1a0] px-6 py-4 flex justify-between items-center'>
      <h2 className='text-2xl font-bold font-share text-gray-900'>🛒 Shopping List</h2>
      <button onClick={onClose} className='text-gray-700 hover:text-gray-900 hover:scale-125 transition-all text-2xl font-bold no-print'>✕</button>
     </div>

    <div className='p-6 overflow-y-auto flex-1'>
     {shoppingList.length === 0 ? (
     <div className='text-center py-8'>
      <div className='text-6xl mb-4'>🛒</div>
      <p className='text-gray-600 font-share'>Add recipes to your meal plan to generate a shopping list!</p>
     </div>) :
     
     (
     <>
     <div className='mb-4 flex justify-between items-center'>
      <p className='text-gray-600 font-share'>You need <span className='font-bold text-[#58e633]'>{shoppingList.length}</span> ingredients for your weekly meals</p>
      <p className='text-sm text-gray-500 font-share'>{checkedItems.size} / {shoppingList.length} checked</p>
     </div>

      <div className='space-y-2'>
      {shoppingList.sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => (
      <div key={index} className={`flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer hover:shadow-md ${checkedItems.has(index) ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 hover:bg-gray-100'
        }`} onClick={() => toggleItem(index)}>

          <span className="hidden show-on-print w-4 h-4 border border-gray-400 mr-2"></span>
        
       <input type='checkbox' checked={checkedItems.has(index)} onChange={() => toggleItem(index)} className='no-print mt-1 w-4 h-4 cursor-pointer accent-[#58e633]' onClick={(e) => e.stopPropagation()} />

       <div className='flex-1'>
        <p className={`font-semibold font-share ${
          checkedItems.has(index) ? 'line-through text-gray-500' : 'text-gray-900'
        }`}>
          {item.name}
        </p>
        <p className='text-sm text-gray-600 font-share'>{item.measure}</p>
       </div>
      </div>
      ))}
     </div>
     </>
     )}
    </div>

    {shoppingList.length > 0 && (
     <div className='bg-gray-50 px-6 py-4 flex gap-3 no-print'>
      <button onClick={handlePrintClick} className='flex-1 px-6 py-3 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] hover:scale-105 transition-all font-share text-center'>🖨️ Print</button>
      <button onClick={handleExportCSVClick} className='flex-1 min-w-[120px] px-6 py-3 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 hover:scale-105 transition-all font-share text-center'>📊 Export CSV</button>
      <button onClick={handleCopyClick} className='flex-1 min-w-[120px] px-6 py-3 text-center bg-amber-200 font-semibold rounded-lg hover:bg-amber-500 hover:scale-105 transition-all font-share'>📋 Copy</button>
      <button onClick={onClose} className='flex-1 min-w-[120px] px-6 py-3 bg-gray-200 text-gray-700 text-center font-semibold rounded-lg hover:bg-gray-300 transition-colors font-share'>Close</button>
     </div>
    )}
   </div>
  </div>
    );
};

export default MealPlanner;