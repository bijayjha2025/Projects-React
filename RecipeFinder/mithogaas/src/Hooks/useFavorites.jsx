
import { useContext, useState, createContext, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites= () => {
    const context= useContext(FavoritesContext);
    if(!context){
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
}

export const FavoritesProvider= ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try{
            const saved = localStorage.getItem("favorites");
            return saved ? JSON.parse(saved) : [];
        }catch{
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (recipe) => {
        setFavorites(prev=> 
            prev.some(f=> f.idMeal === recipe.idMeal) ? prev : [...prev, recipe]
        )
    };

    const removeFavorite = (idMeal) => {
        setFavorites(prev=> prev.filter(f=> f.idMeal !== idMeal));
    };

    const isFavorite = (recipeId) => {
        return favorites.some(fav=> fav.idMeal=== recipeId);
    };

    const toggleFavorite = (recipe) => {
        isFavorite(recipe.idMeal) ? removeFavorite(recipe.idMeal) : addFavorite(recipe);
        }

    return(
        <FavoritesContext.Provider value={{
            favorites,
            addFavorite,
            removeFavorite,
            isFavorite,
            toggleFavorite
        }}>{children}</FavoritesContext.Provider>
    )
}