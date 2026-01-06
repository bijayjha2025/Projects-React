import { useContext, useState, createContext, useEffect } from "react";

const RecipeNotesContext = createContext();

export const useRecipeNotes = () => {
    const context = useContext(RecipeNotesContext);
    if(!context){
        throw new Error('useRecipeNotes must be used within RecipeNotesProvider');
    }
    return context;
}

export const RecipeNotesProvider = ({children}) => {
    const[recipeNotes, setRecipeNotes] = useState(()=> {
        try{
            const saved = localStorage.getItem("recipeNotes");
            return saved ? JSON.parse(saved) : {};
        }catch{
            return {};
        }
    })
}