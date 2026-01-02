
import { useContext, useState, createContext, useEffect, Children } from "react";

const MealPlannerContext = createContext();

export const useMealPlanner = () => {
 const context = useContext(MealPlannerContext);
  if(!context){
        throw new Error('useMealPlanner must be used within MealPlannerProvider');
    }
    return context;
}

export const MealPlannerProvider = ( {children} ) => {
 const[mealPlan, setMealPlan] = useState(()=> {
  try{
      const saved = localStorage.getItem("mealPlan");
      return saved ? JSON.parse(saved): {
        Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [] };
     }catch{
       return{ Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [] };
    } });

    useEffect(() => {
     localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
    }, [mealPlan]);

    const addRecipeToDay = (day, recipe) => {
     setMealPlan(prev => ({
            ...prev,
            [day]: [...prev[day], recipe]
        }));
    }

    const removeRecipeFromDay = (day, recipeId) => {
     setMealPlan(prev => ({
        ...prev,
        [day]: prev[day].filter(recipe => recipe.idMeal !== recipeId)
        }));
    };

    const clearDay = (day) => {
     setMealPlan(prev => ({
        ...prev,
        [day]: []
        }))
    }

    const clearWeek = () => {
     setMealPlan({
        Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
        });
    };

    const getAllRecipes = () => {
     const allRecipes = [];
      Object.values(mealPlan).forEach(dayRecipes => {
        allRecipes.push(...dayRecipes);
      });
        return allRecipes;
    };

     const generateShoppingList = () => {
      const allRecipes = getAllRecipes();
      const ingredientMap = {};

      allRecipes.forEach(recipe => {
       for (let i = 1; i <= 20; i++) {
         const ingredient = recipe[`strIngredient${i}`];
         const measure = recipe[`strMeasure${i}`];
                
         if (ingredient && ingredient.trim()) {
          const key = ingredient.toLowerCase().trim();
                    
         if (ingredientMap[key]) {
          ingredientMap[key].measures.push(measure || '');
          ingredientMap[key].count++;
          } else {
            ingredientMap[key] = { name: ingredient, measures: [measure || ''], count: 1 };
                }
            }}
        });
        return Object.values(ingredientMap).map(item => ({ name: item.name, measure: item.count > 1 ? `${item.measures.join(', ')} (×${item.count})` : item.measures[0], count: item.count }));
    };

    const isRecipeInPlan = (recipeId) => {
     return getAllRecipes().some(recipe => recipe.idMeal === recipeId);
    };

    const getTotalMeals = () => {
        return getAllRecipes().length;
    };

    return(
        <MealPlannerContext.Provider value={{
            mealPlan,
            addRecipeToDay,
            removeRecipeFromDay,
            clearDay,
            clearWeek,
            getAllRecipes,
            generateShoppingList,
            isRecipeInPlan,
            getTotalMeals
        }}>
            {children}
        </MealPlannerContext.Provider>
    )
}