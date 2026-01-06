
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





}