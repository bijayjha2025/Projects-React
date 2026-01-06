
import { useState } from "react";
import { useRecipeNotes } from "../Hooks/useRecipeNotes.jsx";

const RecipeNotesSection = ({ recipeId }) => {
  const { getRecipeNotes, addNote, editNote, deleteNote, addModification, deleteModification, setRating, addCookingEntry, getLastCookedDate, getCookingCount, getSuccessRate, addTip, deleteTip, clearRecipeNotes} = useRecipeNotes();

  const recipeNotes = getRecipeNotes(recipeId);
  const [activeTab, setActiveTab] = useState('notes');

  const [noteText, setNoteText] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editText, setEditText] = useState('');

  const [modOriginal, setModOriginal] = useState('');
  const [modSubstitute, setModSubstitute] = useState('');
  const [modReason, setModReason] = useState('');

  const [cookingSuccess, setCookingSuccess] = useState(true);
  const [cookingComments, setCookingComments] = useState('');

  const [tipText, setTipText] = useState('');

  const handleAddNote = () => {
    addNote(recipeId, noteText);
    setNoteText('');
  }

  const handleEditNote = (note) => {
    setEditingNote(note.id);
    setEditText(note.text);
  }

  const handleSaveEdit = () => {
    editNote(recipeId, editingNote, editText);
    setEditingNote(null);
    setEditText('');
  }

  const handleAddModification = () => {
    addModification(recipeId, modOriginal, modSubstitute, modReason);
    setModOriginal('');
    setModSubstitute('');
    setModReason('');
  }

  const handleAddCookingEntry = () => {
    addCookingEntry(recipeId, cookingSuccess, cookingComments);
    setCookingComments('');
    setCookingSuccess(true);
  }

  const handleAddTip = () => {
    addTip(recipeId, tipText);
    setTipText('');
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const lastCooked = getLastCookedDate(recipeId);
  const cookingCount = getCookingCount(recipeId);
  const successRate = getSuccessRate(recipeId);

  return(
   <div>
   <div>
    <div>
     <h2>My Recipe Notes</h2>
     <p>Personalize this recipe with your own notes and modifications</p>
    </div>

    <div>
     {cookingCount >0 && (
      <div>
       <p>{cookingCount}</p>
       <p>Times Cooked</p>
      </div>
     )}
     {successRate !== null && (
       <div>
        <p>{Math.round(successRate)}</p>
        <p>Success Rate</p>
      </div>
     )}
    </div>
    </div>

    <div>
     <label>Your Rating</label>
     <div>{[1, 2, 3, 4, 5].map(star => (
      <button key={star} onClick={() => setRating(recipeId, star)}>{star <= recipeNotes.rating ? '⭐' : '☆'}</button> ))}
      {recipeNotes.rating > 0 && (
       <button onClick={() => setRating(recipeId, 0)}>Clear</button> )}
     </div>
    </div>

    {lastCooked && (
     <div>
      <p>🍳 Last cooked: <span>{formatDate(lastCooked)}</span></p>
     </div>
    )}

    <div>
     <button onClick={() => setActiveTab('notes')} className={`px-4 py-2 ${activeTab === 'notes' ? '' : ''}`}>Notes ({ recipeNotes.notes?.length || 0 })</button>
     <button onClick={() => setActiveTab('modifications')} className={`px-4 py-2 ${activeTab === 'modifications' ? '' : ''}`}>Substitutions ({recipeNotes.modifications?.length || 0 })</button>
     <button onClick={() => setActiveTab('history')} className={`px-4 py-2 ${ activeTab === 'history' ? '' : ''}`}>Cooking Log ({recipeNotes.cookingHistory?.length || 0})</button>
     <button onClick={() => setActiveTab('tips')} className={`px-4 py-2 ${ activeTab === 'tips' ? '' : '' }`}>My Tips ({recipeNotes.tips?.length || 0})</button>
    </div>
    
    </div>

  );




}

export default RecipeNotesSection;