
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
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites){
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (recipe) => {
        setFavorites(prev=> {
            if(prev.some(fav=> fav.idMeal === recipe.idMeal)){
                return prev;
            }
            return[...prev, recipe];
        })
    };

    const removeFavorite = (recipeId) => {
        setFavorites(prev=> prev.filter(fav=> fav.idMeal !== recipeId));
    };

    const isFavorite = (recipeId) => {
        return favorites.some(fav=> fav.idMeal=== recipeId);
    };

    const toggleFavorite = (recipe) => {
        if(isFavorite(recipe.idMeal)){
            removeFavorite(recipe.idMeal);
        }else{
            addFavorite(recipe);
        }
    };

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