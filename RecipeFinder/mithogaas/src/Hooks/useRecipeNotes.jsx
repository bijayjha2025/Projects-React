
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

    useEffect(() => {
        localStorage.setItem("recipeNotes", JSON.stringify(recipeNotes));
    }, [recipeNotes]);

    const getRecipeNotes = (recipeId) => {
        return recipeNotes[recipeId] || {
            notes: [],
            modifications: [],
            rating: [],
            cookingHistory: [],
            tips: []
        }
    }

    const addNote = (recipeId, noteText) => {
     if(!noteText.trim()) return;
     setRecipeNotes(prev => ({
       ...prev, [recipeId]: { ...getRecipeNotes(recipeId), notes: [ ...(prev[recipeId]?.notes || []),{ id: Date.now(), text: noteText, date: new Date().toISOString(), edited: false } ]
     }}))
    }

    const editNote = (recipeId, noteId, newText) => {
     if(!newText.trim()) return;
     setRecipeNotes(prev => ({ ...prev, [recipeId]: { ...prev[recipeId], notes: prev[recipeId].notes.map(note => note.id === noteId ? {...note, text: newText, edited: true, lastEditDate: new Date().toISOString()} : note )}
    }))
    }

    const deleteNote = (recipeId, noteId) => {
     setRecipeNotes(prev => ({ ...prev, [recipeId]: { ...prev[recipeId], notes: prev[recipeId].notes.filter(note => note.id !== noteId )}
    }))
    }

    const addModification = (recipeId, original, substitute, reason = '') => {
     if (!original.trim() || !substitute.trim()) return;
      setRecipeNotes(prev => ({
        ...prev, [recipeId]: { ...getRecipeNotes(recipeId), modifications: [ ...(prev[recipeId]?.modifications || []), { id: Date.now(), original, substitute, reason, date: new Date().toISOString() }]
       }}));
     }

    const deleteModification = (recipeId, modId) => {
     setRecipeNotes(prev => ({
      ...prev, [recipeId]: { ...prev[recipeId], modifications: prev[recipeId].modifications.filter(mod => mod.id !== modId) }
     }));
    };

    const setRating = (recipeId, rating) => {
     if (rating < 0 || rating > 5) return;
      setRecipeNotes(prev => ({
        ...prev, [recipeId]: { ...getRecipeNotes(recipeId), rating }
        }));
    };

    const addCookingEntry = (recipeId, success = true, comments = '') => {
       setRecipeNotes(prev => ({
          ...prev,
            [recipeId]: { ...getRecipeNotes(recipeId), cookingHistory: [ ...(prev[recipeId]?.cookingHistory || []), { id: Date.now(), date: new Date().toISOString(), success, comments }]
            }
        }));
    };

    const getLastCookedDate = (recipeId) => {
     const notes = getRecipeNotes(recipeId);
      if (!notes.cookingHistory || notes.cookingHistory.length === 0) { return null; }
        const sorted = [...notes.cookingHistory].sort((a, b) => new Date(b.date) - new Date(a.date) );
        return sorted[0].date;
    };

    const getCookingCount = (recipeId) => {
      const notes = getRecipeNotes(recipeId);
      return notes.cookingHistory?.length || 0;
    };

    const getSuccessRate = (recipeId) => {
     const notes = getRecipeNotes(recipeId);
      if (!notes.cookingHistory || notes.cookingHistory.length === 0) { return null; }
     const successCount = notes.cookingHistory.filter(entry => entry.success).length;
      return (successCount / notes.cookingHistory.length) * 100;
    };

    const addTip = (recipeId, tipText) => {
     if (!tipText.trim()) return;
     setRecipeNotes(prev => ({ ...prev, [recipeId]: { ...getRecipeNotes(recipeId), tips: [ ...(prev[recipeId]?.tips || []), { id: Date.now(), text: tipText, date: new Date().toISOString() }]}
    }));
    };

    const deleteTip = (recipeId, tipId) => {
     setRecipeNotes(prev => ({ ...prev, [recipeId]: { ...prev[recipeId], tips: prev[recipeId].tips.filter(tip => tip.id !== tipId) }
    }));
    };

    const hasCustomizations = (recipeId) => {
     const notes = getRecipeNotes(recipeId);
       return (
        notes.notes?.length > 0 || notes.modifications?.length > 0 || notes.rating > 0 || notes.cookingHistory?.length > 0 || notes.tips?.length > 0 );
    }

    const clearRecipeNotes = (recipeId) => {
     setRecipeNotes(prev => {
      const updated = { ...prev };
      delete updated[recipeId];
      return updated;
    })};

    return(
        <RecipeNotesContext.Provider value={{ getRecipeNotes, addNote, editNote, deleteNote, addModification, deleteModification, setRating, addCookingEntry, getLastCookedDate, getCookingCount, getSuccessRate, addTip, deleteTip, hasCustomizations, clearRecipeNotes }}>{children}</RecipeNotesContext.Provider>
    );
}