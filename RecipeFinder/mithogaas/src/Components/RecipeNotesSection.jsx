
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
   <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
    <div>
     <h2 className="text-2xl font-bold font-share mb-2">My Recipe Notes</h2>
     <p className="text-gray-600 font-share text-sm">Personalize this recipe with your own notes and modifications</p>
    </div>

    <div className="flex gap-4">
     {cookingCount >0 && (
      <div className="text-center bg-blue-50 px-4 py-2 rounded-lg">
       <p className="text-2xl font-bold text-green-600">{cookingCount}</p>
       <p className="text-xs text-gray-600 font-share">Times Cooked</p>
      </div>
     )}
     {successRate !== null && (
       <div className="text-center bg-green-50 px-4 py-2 rounded-lg">
        <p className="text-2xl font-bold text-blue-600">{Math.round(successRate)}</p>
        <p className="text-xs text-gray-600 font-share">Success Rate</p>
      </div>
     )}
    </div>
    </div>

    <div className="mb-6 pb-6 border-b border-gray-200">
     <label className="block text-sm font-semibold mb-2 font-share">Your Rating</label>
     <div className="flex gap-2">{[1, 2, 3, 4, 5].map(star => (
      <button key={star} onClick={() => setRating(recipeId, star)} className="text-3xl transition-transform hover:scale-110">{star <= recipeNotes.rating ? '⭐' : '☆'}</button> ))}
      {recipeNotes.rating > 0 && (
       <button onClick={() => setRating(recipeId, 0)} className="ml-2 text-sm text-gray-500 hover:text-red-600 font-share">Clear</button> )}
     </div>
    </div>

    {lastCooked && (
     <div className="pb-6 mb-6 border-b border-gray-200">
      <p className="text-sm text-gray-600 font-share">🍳 Last cooked: <span className="font-semibold">{formatDate(lastCooked)}</span></p>
     </div>
    )}

    <div className="flex gap-2 border-b border-gray-200 mb-6 overflow-x-auto">
     <button onClick={() => setActiveTab('notes')} className={`px-4 py-2 font-semibold font-share whitespace-nowrap transition-colors ${activeTab === 'notes' ? 'border-b-2 border-[#58e633] text-[#58e633]' : 'text-gray-600 hover:text-gray-900'}`}>Notes ({ recipeNotes.notes?.length || 0 })</button>
     <button onClick={() => setActiveTab('modifications')} className={`px-4 py-2 font-semibold font-share whitespace-nowrap transition-colors ${activeTab === 'modifications' ? 'border-b-2 border-[#58e633] text-[#58e633]' : 'text-gray-600 hover:text-gray-900'}`}>Substitutions ({recipeNotes.modifications?.length || 0 })</button>
     <button onClick={() => setActiveTab('history')} className={`px-4 py-2 font-semibold font-share whitespace-nowrap transition-colors ${ activeTab === 'history' ? 'border-b-2 border-[#58e633] text-[#58e633]' : 'text-gray-600 hover:text-gray-900'}`}>Cooking Log ({recipeNotes.cookingHistory?.length || 0})</button>
     <button onClick={() => setActiveTab('tips')} className={`px-4 py-2 font-semibold font-share whitespace-nowrap transition-colors ${ activeTab === 'tips' ? 'border-b-2 border-[#58e633] text-[#58e633]' : 'text-gray-600 hover:text-gray-900' }`}>My Tips ({recipeNotes.tips?.length || 0})</button>
    </div>
    
    {activeTab === 'notes' && (
     <div>
      <div className="mb-6">
       <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Add a personal note about this recipe..." rows={3} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#58e633] font-share resize-none" />
       <button onClick={handleAddNote} disabled={!noteText.trim()} className="mt-2 px-6 py-2 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-share ">Add Note</button>
       </div>

       {recipeNotes.notes?.length > 0 ? (
        <div className="space-y-3">
        {recipeNotes.notes.map((note => (
         <div key={note.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          {editingNote === note.id ? (
           <div>
            <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded font-share mb-2" />
            <div className="flex gap-2">
             <button onClick={handleSaveEdit} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-share">Save</button>
             <button onClick={() => setEditingNote(null)} className='px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm font-share'>Cancel</button>
            </div>
           </div>
          ) : (
          <>
          <p className="text-gray-800 font-share mb-2">{note.text}</p>
           <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 font-share">{formatDate(note.date)}{note.edited && ' (edited)'}</p>
             <div className="flex gap-2">
              <button onClick={() => handleEditNote(note)} className="text-blue-600 hover:text-blue-800 text-sm font-share">Edit</button>
              <button onClick={() => deleteNote(recipeId, note.id)} className="text-red-600 hover:text-red-800 text-sm font-share">Delete</button>
             </div>
            </div>
           </>  )}
          </div>
         )))}
        </div>
       ): (
        <p className='text-gray-500 text-center py-8 font-share'>No notes yet. Add your first note above!</p> )}
     </div>
     )}

    {activeTab === 'modifications' && (
     <div>
     <div className="mb-6 bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-3 font-share">Add Ingredient Substitution</h3>
      <div>
       <input type='text' value={modOriginal} onChange={(e) => setModOriginal(e.target.value)}placeholder='Original ingredient' className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#58e633] font-share "/>
       <input type='text' value={modSubstitute} onChange={(e) => setModSubstitute(e.target.value)} placeholder='Substitute with' className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#58e633] font-share' />
      </div>
      <input type='text' value={modReason} onChange={(e) => setModReason(e.target.value)} placeholder='Reason (optional)' className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#58e633] font-share mb-3'/>
      <button onClick={handleAddModification} disabled={!modOriginal.trim() || !modSubstitute.trim()} className='px-6 py-2 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-share'>Add Substitution</button>
     </div>
     
     {recipeNotes.modifications?.length > 0 ? (
      <div className="space-y-3">
       {recipeNotes.modifications.map(mod => (
        <div key={mod.id} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
         <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
           <p className="font-share"><span className="line-through text-gray-600">{mod.original}</span>{' → '}<span className="font-semibold text-blue-700">{mod.substitute}</span></p>
           {mod.reason && (
           <p className="text-sm text-gray-600 mt-1 font-share italic">{mod.reason}</p> )}
           <p className="text-xs text-gray-500 mt-2 font-share">{formatDate(mod.date)}</p>
          </div>
          <button onClick={() => deleteModification(recipeId, mod.id)} className='text-red-600 hover:text-red-800 text-sm font-share'>Delete</button>
         </div>
        </div> ))}
        </div>
        ) : (
          <p className='text-gray-500 text-center py-8 font-share'>No substitutions recorded yet.</p> )}
         </div>
         )}

        
        {activeTab === 'history' && (
         <div>
         <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-share mb-3 font-semibold">Log Cooking Session</h3>
          <div className="mb-3">
           <label className="flex items-center gap-2 mb-2">
            <input type='radio' checked={cookingSuccess} onChange={() => setCookingSuccess(true)} className="w-4 h-4"/>
             <span className="font-share">✅ Success - Turned out great!</span>
            </label>
            <label className="flex items-center gap-2">
             <input type='radio' checked={!cookingSuccess} onChange={() => setCookingSuccess(false)} className="w-4 h-4"/>
             <span className="font-share">❌ Needs improvement</span>
            </label>
           </div>
            <textarea value={cookingComments} onChange={(e) => setCookingComments(e.target.value)} placeholder='Any comments? (optional)' rows={2} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#58e633] font-share mb-3'/>
            <button onClick={handleAddCookingEntry} className='px-6 py-2 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors font-share'>Log Cooking Session </button>
           </div>

           {recipeNotes.cookingHistory?.length > 0 ? (
            <div className="space-y-3">
             {[...recipeNotes.cookingHistory].reverse().map(entry => (
              <div key={entry.id} className={`p-4 rounded border-l-4 ${ entry.success ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
              <div className="flex justify-between items-start">
               <div>
               <p className="font-semibold font-share">{entry.success ? '✅ Success' : '❌ Needs Work'} </p>
               {entry.comments && (
               <p className="text-sm font-share text-gray-700 mt-1">{entry.comments}</p> )}
               <p className="text-xs text-gray-500 mt-2 font-share">{formatDate(entry.date)}</p>
               </div>
               </div>
               </div> ))}
              </div>
             ) : (
              <p className='text-gray-500 text-center py-8 font-share'>No cooking sessions logged yet.</p> )}
             </div>
            )}

      
          {activeTab === 'tips' && (
           <div>
           <div className="mb-6">
            <textarea value={tipText} onChange={(e) => setTipText(e.target.value)} placeholder='Share a cooking tip or trick for this recipe...' rows={3} className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#58e633] font-share resize-none'/>
            <button onClick={handleAddTip} disabled={!tipText.trim()} className='mt-2 px-6 py-2 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-share'>Add Tip</button>
           </div>

           {recipeNotes.tips?.length > 0 ? (
            <div className="space-y-3">
             {recipeNotes.tips.map(tip => (
             <div key={tip.id} className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
              <p className="text-gray-800 font-share mb-2">💡 {tip.text}</p>
             <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500 font-share">{formatDate(tip.date)}</p>
              <button onClick={() => deleteTip(recipeId, tip.id)} className='text-red-600 hover:text-red-800 text-sm font-share'>Delete</button>
             </div>
             </div>))}
            </div>
          ) : (
           <p className='text-gray-500 text-center py-8 font-share'>No tips added yet.</p> )}
          </div>
         )}

         {(recipeNotes.notes?.length > 0 || recipeNotes.modifications?.length > 0 || recipeNotes.cookingHistory?.length > 0 || recipeNotes.tips?.length > 0) && (
         <div className='mt-6 pt-6 border-t border-gray-200'>
         <button onClick={() => { if (window.confirm('Are you sure you want to clear all notes and customizations for this recipe?')) { clearRecipeNotes(recipeId); }}} className='text-red-600 hover:text-red-800 text-sm font-semibold font-share'>Clear All Notes & Customizations</button>
         </div>
        )}
      </div>
    );
};

export default RecipeNotesSection;