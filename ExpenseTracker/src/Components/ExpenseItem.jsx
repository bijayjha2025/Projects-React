
function ExpenseItem({ expense, onDelete }){
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric' });
    }
    return(
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center justify-between group">
         <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">{expense.category}</span>
            <span className="text-gray-500 text-sm">{formatDate(expense.date)}</span>
          </div>
          {expense.note && ( <p className="text-gray-600 text-sm mt-2">{expense.note}</p>)}
         </div>

         <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-amber-900 font-story">${expense.amount.toFixed(2)}</span>
           <button onClick={()=> onDelete(expense.id)} className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium cursor-pointer">Delete</button>
         </div>
    
        </div>
    );
}

export default ExpenseItem