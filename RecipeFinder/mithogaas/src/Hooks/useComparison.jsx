import { useContext, useState, createContext, useEffect } from "react";

const ComparisonContext = createContext();

export const useComparison = () => {
  const context = useContext(ComparisonContext);
   if(!context){
    throw new Error('useComparison must be used within ComparisonProvider');
   }
  return context;
}

export const ComparisonProvider = ({ children }) => {
  const [comparisonList, setComparisonList] = useState(() => {
    try{
      const saved = localStorage.getItem("comparisonList");
      return saved ? JSON.parse(saved) : [];
      }
    catch{
      return [];
     }
  });

  useEffect(() => {
     localStorage.setItem("comparisonList", JSON.stringify(comparisonList));
    }, [comparisonList]);

   const addToComparison = (recipe) => {
     if (comparisonList.length >= 3) {
        alert('You can only compare up to 3 recipes at a time. Remove one first.');
        return false;
      }
        
     if (isInComparison(recipe.idMeal)) {
        return false;
      }

     setComparisonList(prev => [...prev, recipe]);
        return true;
    };

    const removeFromComparison = (recipeId) => {
        setComparisonList(prev => prev.filter(recipe => recipe.idMeal !== recipeId));
    };

    const isInComparison = (recipeId) => {
        return comparisonList.some(recipe => recipe.idMeal === recipeId);
    };

    const clearComparison = () => {
        setComparisonList([]);
    };

    const getComparisonCount = () => {
        return comparisonList.length;
    };

    const canCompare = () => {
        return comparisonList.length >= 2;
    };

    return(
        <ComparisonContext.Provider value={{
            comparisonList,
            addToComparison,
            removeFromComparison,
            isInComparison,
            clearComparison,
            getComparisonCount,
            canCompare
        }}>
            {children}
        </ComparisonContext.Provider>
    )
}