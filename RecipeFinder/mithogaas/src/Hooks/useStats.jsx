import { useFavorites } from "./useFavorites";
import { useMealPlanner } from "./useMealPlanner";
import { useRecipeNotes } from "./useRecipeNotes";

export const useStats = () => {
  const {favorites} = useFavorites();
  const {getAllRecipes: getMealPlanRecipes} = useMealPlanner();
  const {getRecipeNotes} = useRecipeNotes();

  const getViewingHistory = () => {
    try{
     const history = localStorage.getItem('viewingHistory');
     return history ? JSON.parse(history) : [];
    }catch{
     return[];
    }
  };

  const trackRecipeView = (recipe) => {
    const history = getViewingHistory();
    const newView = {
      recipeId: recipe.idMeal,
      recipeName: recipe.strMeal,
      category: recipe.strCategory,
      area: recipe.strArea,
      image: recipe.strMealThumb,
      timestamp: new Date().toISOString()
    };

   const updatedHistory = [newView, ...history].slice(0,100);
    localStorage.setItem('viewingHistory', JSON.stringify(updatedHistory));
  };

  const getRecipeWithNotes = () => {
    try{
      const notes = localStorage.getItem('recipeNotes');
      return notes ? Object.keys(JSON.parse(notes)) : [];
    }catch{
      return [];
    }
  };

  const calculateStats = () => {
    const viewingHistory = getViewingHistory();
    const mealPlanRecipes = getMealPlanRecipes();
    const recipeWithNotes = getRecipeWithNotes();

    const totalViewed = new Set(viewingHistory.map(v => v.recipeId)).size;
    const totalFavorites = favorites.length;
    const totalPlanned = mealPlanRecipes.length;
    const totalCustomized = recipeWithNotes.length;

    const categoryBreakdown = favorites.reduce((acc, recipe) => {
      acc[recipe.strCategory] = (acc[recipe.strCategory] || 0) + 1;
      return acc;
    }, {});

    const cuisineBreakdown = favorites.reduce((acc, recipe) => {
      acc[recipe.strArea] = (acc[recipe.strArea] || 0) + 1;
      return acc;
    }, {});

    const viewedCategories = viewingHistory.reduce((acc, view) => {
       if (view.category) {
        acc[view.category] = (acc[view.category] || 0) + 1;
        }
       return acc;
    }, {});

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyActivity = viewingHistory.filter(view => new Date(view.timestamp) >= thirtyDaysAgo).reduce((acc, view) => {
      const date = new Date(view.timestamp).toLocaleDateString();
       acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentViews = viewingHistory.filter(
       view => new Date(view.timestamp) >= sevenDaysAgo).length;

    let totalCookingSessions = 0;
    let successfulSessions = 0;
    let topRatedRecipes = [];

    recipesWithNotes.forEach(recipeId => {
      const notes = getRecipeNotes(recipeId);
      
    if (notes.cookingHistory && notes.cookingHistory.length > 0) {
      totalCookingSessions += notes.cookingHistory.length;
      successfulSessions += notes.cookingHistory.filter(h => h.success).length; }

    if (notes.rating > 0) {
      const recipe = favorites.find(f => f.idMeal === recipeId);
      if (recipe) { topRatedRecipes.push({ recipe, rating: notes.rating });
      }}
    });

    topRatedRecipes.sort((a, b) => b.rating - a.rating);

    const recipeViewCounts = viewingHistory.reduce((acc, view) => {
      acc[view.recipeId] = { count: (acc[view.recipeId]?.count || 0) + 1, name: view.recipeName, category: view.category, image: view.image };
      return acc;
    }, {});

    const mostViewed = Object.entries(recipeViewCounts).map(([id, data]) => ({ recipeId: id, ...data })).sort((a, b) => b.count - a.count).slice(0, 5);

    return {
      overview: { totalViewed, totalFavorites, totalPlanned, totalCustomized, recentViews, totalCookingSessions, successRate: totalCookingSessions > 0 ? Math.round((successfulSessions / totalCookingSessions) * 100) : 0 },
      
      categories: { favorite: categoryBreakdown, viewed: viewedCategories },
      
      cuisines: cuisineBreakdown, activity: dailyActivity,
      
      topRecipes: { mostViewed, topRated: topRatedRecipes.slice(0, 5) }
    };
    };

    return { calculateStats, trackRecipeView, getViewingHistory };
};