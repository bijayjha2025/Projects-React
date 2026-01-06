
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
    
    {activeTab === 'notes' && (
     <div>
      <div>
       <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Add a personal note about this recipe..." rows={3} />
       <button onClick={handleAddNote} disabled={!noteText.trim()}>Add Note</button>
       </div>

       {recipeNotes.notes?.length > 0 ? (
        <div>
         {recipeNotes.notes.map((note => (
            <div key={note.id}>
                {editingNote === note.id ? (
                    <div>
                        <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={2} />
                            <div>
                                <button onClick={handleSaveEdit}>Save</button>
                                <button onClick={setEditingNote}>Cancel</button>
                                </div>
                                </div>
                ) : (
                    <>
                    <p>{note.text}</p>
                    <div>
                        <p>{formatDate(note.date)}{note.edited && ' (edited)'}</p>
                        <div>
                            <button onClick={handleEditNote(note)}>Edit</button>
                            <button onClick={deleteNote(recipeId, note.id)}>Delete</button>
                        </div>
                    </div>
                    </>  
                )}
                </div>
         )))}

         </div>
       ): (
        <p>No notes yet. Add your first note above!</p>
       )}
        </div>
    )}

    {activeTab === 'modifications' && (
                <div>
                    {/* Add Modification Form */}
                    <div className='mb-6 bg-gray-50 p-4 rounded-lg'>
                        <h3 className='font-semibold mb-3 font-share'>Add Ingredient Substitution</h3>
                        <div className='grid md:grid-cols-2 gap-3 mb-3'>
                            <input
                                type='text'
                                value={modOriginal}
                                onChange={(e) => setModOriginal(e.target.value)}
                                placeholder='Original ingredient'
                                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#58e633] font-share'
                            />
                            <input
                                type='text'
                                value={modSubstitute}
                                onChange={(e) => setModSubstitute(e.target.value)}
                                placeholder='Substitute with'
                                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#58e633] font-share'
                            />
                        </div>
                        <input
                            type='text'
                            value={modReason}
                            onChange={(e) => setModReason(e.target.value)}
                            placeholder='Reason (optional)'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#58e633] font-share mb-3'
                        />
                        <button
                            onClick={handleAddModification}
                            disabled={!modOriginal.trim() || !modSubstitute.trim()}
                            className='px-6 py-2 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-share'
                        >
                            Add Substitution
                        </button>
                    </div>
        {recipeNotes.modifications?.length > 0 ? (
                        <div className='space-y-3'>
                            {recipeNotes.modifications.map(mod => (
                                <div key={mod.id} className='bg-blue-50 border-l-4 border-blue-400 p-4 rounded'>
                                    <div className='flex items-start justify-between gap-4'>
                                        <div className='flex-1'>
                                            <p className='font-share'>
                                                <span className='line-through text-gray-600'>{mod.original}</span>
                                                {' → '}
                                                <span className='font-semibold text-blue-700'>{mod.substitute}</span>
                                            </p>
                                            {mod.reason && (
                                                <p className='text-sm text-gray-600 mt-1 font-share italic'>{mod.reason}</p>
                                            )}
                                            <p className='text-xs text-gray-500 mt-2 font-share'>{formatDate(mod.date)}</p>
                                        </div>
                                        <button
                                            onClick={() => deleteModification(recipeId, mod.id)}
                                            className='text-red-600 hover:text-red-800 text-sm font-share'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-500 text-center py-8 font-share'>No substitutions recorded yet.</p>
                    )}
                </div>
            )}

            {/* Cooking History Tab */}
            {activeTab === 'history' && (
                <div>
                    {/* Add Cooking Entry Form */}
                    <div className='mb-6 bg-gray-50 p-4 rounded-lg'>
                        <h3 className='font-semibold mb-3 font-share'>Log Cooking Session</h3>
                        <div className='mb-3'>
                            <label className='flex items-center gap-2 mb-2'>
                                <input
                                    type='radio'
                                    checked={cookingSuccess}
                                    onChange={() => setCookingSuccess(true)}
                                    className='w-4 h-4'
                                />
                                <span className='font-share'>✅ Success - Turned out great!</span>
                            </label>
                            <label className='flex items-center gap-2'>
                                <input
                                    type='radio'
                                    checked={!cookingSuccess}
                                    onChange={() => setCookingSuccess(false)}
                                    className='w-4 h-4'
                                />
                                <span className='font-share'>❌ Needs improvement</span>
                            </label>
                        </div>
                        <textarea
                            value={cookingComments}
                            onChange={(e) => setCookingComments(e.target.value)}
                            placeholder='Any comments? (optional)'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#58e633] font-share mb-3'
                            rows={2}
                        />
                        <button
                            onClick={handleAddCookingEntry}
                            className='px-6 py-2 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors font-share'
                        >
                            Log Cooking Session
                        </button>
                    </div>

                    {/* Cooking History List */}
                    {recipeNotes.cookingHistory?.length > 0 ? (
                        <div className='space-y-3'>
                            {[...recipeNotes.cookingHistory].reverse().map(entry => (
                                <div key={entry.id} className={`p-4 rounded border-l-4 ${
                                    entry.success ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
                                }`}>
                                    <div className='flex justify-between items-start'>
                                        <div>
                                            <p className='font-semibold font-share'>
                                                {entry.success ? '✅ Success' : '❌ Needs Work'}
                                            </p>
                                            {entry.comments && (
                                                <p className='text-sm text-gray-700 mt-1 font-share'>{entry.comments}</p>
                                            )}
                                            <p className='text-xs text-gray-500 mt-2 font-share'>{formatDate(entry.date)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-500 text-center py-8 font-share'>No cooking sessions logged yet.</p>
                    )}
                </div>
            )}

            {/* Tips Tab */}
            {activeTab === 'tips' && (
                <div>
                    {/* Add Tip Form */}
                    <div className='mb-6'>
                        <textarea
                            value={tipText}
                            onChange={(e) => setTipText(e.target.value)}
                            placeholder='Share a cooking tip or trick for this recipe...'
                            className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#58e633] font-share resize-none'
                            rows={3}
                        />
                        <button
                            onClick={handleAddTip}
                            disabled={!tipText.trim()}
                            className='mt-2 px-6 py-2 bg-[#a7f1a0] text-black font-semibold rounded-lg hover:bg-[#58e633] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-share'
                        >
                            Add Tip
                        </button>
                    </div>

                    {/* Tips List */}
                    {recipeNotes.tips?.length > 0 ? (
                        <div className='space-y-3'>
                            {recipeNotes.tips.map(tip => (
                                <div key={tip.id} className='bg-purple-50 border-l-4 border-purple-400 p-4 rounded'>
                                    <p className='text-gray-800 font-share mb-2'>💡 {tip.text}</p>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-xs text-gray-500 font-share'>{formatDate(tip.date)}</p>
                                        <button
                                            onClick={() => deleteTip(recipeId, tip.id)}
                                            className='text-red-600 hover:text-red-800 text-sm font-share'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-500 text-center py-8 font-share'>No tips added yet.</p>
                    )}
                </div>
            )}

            {/* Clear All Button */}
            {(recipeNotes.notes?.length > 0 || 
              recipeNotes.modifications?.length > 0 || 
              recipeNotes.cookingHistory?.length > 0 || 
              recipeNotes.tips?.length > 0) && (
                <div className='mt-6 pt-6 border-t border-gray-200'>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to clear all notes and customizations for this recipe?')) {
                                clearRecipeNotes(recipeId);
                            }
                        }}
                        className='text-red-600 hover:text-red-800 text-sm font-semibold font-share'
                    >
                        Clear All Notes & Customizations
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecipeNotesSection;