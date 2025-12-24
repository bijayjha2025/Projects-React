
import ExpenseItem from "./ExpenseItem.jsx";

function ExpenseList({ expenses, onDeleteExpense, onEditExpense, onClearAll}){
    if(expenses.length === 0){
        return(
          <div className="p-12 bg-white rounded-3xl shadow-lg border border-amber-50 text-center">
            <p className="text-gray-400 text-lg font-story">No expenses yet. Start tracking your treasures!</p>
          </div>
        );
    }

    return(
      <div>
        <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-2xl font-bold text-amber-900 mb-4 font-story px-2">Your Expenses</h2>
        <button onClick={onClearAll} className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer">Clear All</button>
        </div>

        <div className="flex flex-col gap-3">
         {expenses.map(expense => (
         <ExpenseItem key={expense.id} expense={expense} onDelete={onDeleteExpense} onEdit = {onEditExpense} />
         ))}
        </div>
      </div>
    );
}

export default ExpenseList