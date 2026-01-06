import { useComparison } from "../Hooks/useComparison.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

const RecipeComparison = () => {
  const { comparisonList, removeFromComparison, clearComparison } =
    useComparison();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
        setTimeout(() => setIsLoaded(true), 100);
    }, []);

  if (comparisonList.length < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-4 font-share">No Recipes to Compare</h2>
          <p className="text-gray-600 mb-6 font-share">Add at least 2 recipes to start comparing</p>

          <Link to="/recipes" className="inline-block px-6 py-3 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors font-share">Browse Recipes</Link>
        </div>
      </div>
    );
  }

  const getIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ name: ingredient, measure: measure || "" });
      }
    }
    return ingredients;
  };

  const getStepCount = (recipe) => {
    return recipe.strInstructions.split("\n").filter((step) => step.trim()).length;
  };

  const estimateCookingTime = (recipe) => {
    const instructions = recipe.strInstructions.toLowerCase();
    const timeMatches = instructions.match(/(\d+)\s*(minute|min|hour|hr)/gi);
    if (timeMatches && timeMatches.length > 0) {
      const totalMinutes = timeMatches.reduce((sum, match) => {
        const num = parseInt(match);
        if (match.includes("hour") || match.includes("hr")) {
          return sum + num * 60;
        }
        return sum + num;
      }, 0);
      return totalMinutes;
    }
    return null;
  };

  const findCommonIngredients = () => {
    const ingredientSets = comparisonList.map((recipe) =>
      getIngredients(recipe).map((ing) => ing.name.toLowerCase().trim())
    );

    return ingredientSets[0].filter((ing) =>
      ingredientSets.every((set) => set.includes(ing))
    );
  };

  const commonIngredients = findCommonIngredients();

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="bg-white border-b-2 border-gray-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Link to="/recipes" className="text-gray-600 hover:text-[#58e633] font-share font-semibold mb-2 inline-block">← Back to Recipes</Link>
              <h1 className="text-3xl md:text-4xl font-bold font-share">Recipe Comparison</h1>
            </div>
            <button onClick={clearComparison} className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors font-share">Clear All</button>
          </div>

         <div className="flex gap-2 border-b border-gray-200">
          <button onClick={() => setActiveTab("overview")} className={`px-4 py-2 font-semibold font-share transition-colors ${ activeTab === "overview" ? "border-b-2 border-[#58e633] text-[#58e633]" : "text-gray-600 hover:text-gray-900"}`}>
          Overview</button>
          <button onClick={() => setActiveTab("ingredients")} className={`px-4 py-2 font-semibold font-share transition-colors ${activeTab === "ingredients" ? "border-b-2 border-[#58e633] text-[#58e633]" : "text-gray-600 hover:text-gray-900"}`}> Ingredients</button>
          <button onClick={() => setActiveTab("instructions")} className={`px-4 py-2 font-semibold font-share transition-colors ${activeTab === "instructions" ? "border-b-2 border-[#58e633] text-[#58e633]" : "text-gray-600 hover:text-gray-900"}`}>Instructions</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
       {activeTab === "overview" && (
         <div className="grid gap-6 animate-fadeSlideUp" style={{gridTemplateColumns: `repeat(${comparisonList.length}, 1fr)`, }}>
          {comparisonList.map((recipe, index) => {
          const ingredients = getIngredients(recipe);
          const stepCount = getStepCount(recipe);
          const cookingTime = estimateCookingTime(recipe);

          return (
           <div key={recipe.idMeal} className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${ isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8' }`} style={{ transitionDelay: `${index * 150}ms` }} >

            <div className="relative group">
             <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"/>
             <button onClick={() => removeFromComparison(recipe.idMeal)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110">✕</button>
            </div>

            <div className="p-6">
             <h3 className="text-xl font-bold mb-3 font-share">{recipe.strMeal}</h3>
             <div className="space-y-3 mb-4">
             <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-share">Category</span>
              <span className="font-semibold font-share">{recipe.strCategory}</span>
             </div>

             <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-share">Cuisine</span>
              <span className="font-semibold font-share">{recipe.strArea}</span>
             </div>

             <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-share">Ingredients</span>
              <span className="font-semibold font-share">{ingredients.length}</span>
             </div>

             <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-share">Steps</span>
              <span className="font-semibold font-share">{stepCount}</span>
             </div>

             {cookingTime && (
              <div className="flex justify-between py-2 border-b border-gray-200">
               <span className="text-gray-600 font-share">Est. Time</span>
               <span className="font-semibold font-share">{cookingTime >= 60 ? `${Math.floor(cookingTime / 60)}h ${cookingTime % 60}m`: `${cookingTime}m`}</span>
              </div> )}
              </div>

              {recipe.strTags && (
              <div className="flex flex-wrap gap-2 mb-4">
              {recipe.strTags.split(",").map((tag, i) => (
               <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-share">{tag.trim()}</span>
               ))}
              </div>
              )}

             <div className="flex gap-2">
              <Link to={`/recipe/${recipe.idMeal}`} className="flex-1 px-4 py-2 bg-[#a7f1a0] text-black text-center font-semibold rounded-lg hover:bg-[#58e633] transition-colors font-share text-sm">View Full Recipe</Link>
             </div>
            </div>
           </div> ); })};
          </div>
        )}

        {activeTab === "ingredients" && (
         <div className='animate-fadeSlideUp'>
          {commonIngredients.length > 0 && (
           <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold mb-3 font-share text-green-800">🎯 Common Ingredients ({commonIngredients.length})</h3>
             <div className="flex flex-wrap gap-2">
             {commonIngredients.map((ing, i) => (
             <span key={i} className="px-3 py-1 bg-green-200 text-green-900 rounded-full text-sm font-semibold font-share capitalize">{ing}</span>
              ))}
             </div>
           </div>
            )}

           <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${comparisonList.length}, 1fr)`, }}>
            {comparisonList.map((recipe, index) => {
             const ingredients = getIngredients(recipe);

            return (
             <div key={recipe.idMeal} className={`bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 ${ isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8' }`} style={{ transitionDelay: `${(index + 1) * 150}ms` }}>
              <h4 className="font-bold text-lg mb-4 font-share">{recipe.strMeal}</h4>
              <ul className="space-y-2">
              {ingredients.map((ing, i) => {
                const isCommon = commonIngredients.includes( ing.name.toLowerCase().trim() );
                return (
                 <li key={i} className={`flex items-start gap-2 ${ isCommon ? "bg-green-50 px-2 py-1 rounded" : "" }`}>
                 <span className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${isCommon ? "bg-green-500" : "bg-gray-400"}`}></span>
                 <span className="text-sm font-share"><span className="font-semibold">{ing.measure}</span>{" "}{ing.name}</span>
                 </li> )})}
                </ul>
                </div>
                )})}
            </div>
          </div>
        )}

        {activeTab === "instructions" && (
         <div className="grid gap-6 animate-fadeSlideUp" style={{ gridTemplateColumns: `repeat(${comparisonList.length}, 1fr)`, }}>
          {comparisonList.map((recipe, index) => {
           const steps = recipe.strInstructions
            .split("\n")
            .filter((step) => step.trim());
            return (
             <div key={recipe.idMeal} className={`bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 ${ isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8' }`} style={{ transitionDelay: `${index * 150}ms` }} >
              <h4 className="font-bold text-lg mb-4 font-share">{recipe.strMeal}</h4>
              <ol className="space-y-4">
               {steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                 <span className="flex-shrink-0 w-8 h-8 bg-[#a7f1a0] rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</span>
                 <p className="text-sm text-gray-700 font-share pt-1">{step}</p>
                </li> ))}
               </ol>
              </div>
              )})}
          </div>)}
      </div>
    </div>
  );
};

export default RecipeComparison;
