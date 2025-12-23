
import ExpenseItem from "./ExpenseItem.jsx";

function ExpenseList({ expenses, onDeleteExpense}){
    if(expenses.length === 0){
        return(
          <div className="p-12 bg-white rounded-3xl shadow-lg border border-amber-50 text-center">
            <p className="text-gray-400 text-lg font-story">No expenses yet. Start tracking your treasures!</p>
          </div>
        );
    }

    return(
      <div>
      <h2 className="text-2xl font-bold text-amber-900 mb-4 font-story px-2">Your Expenses</h2>
        <div className="flex flex-col gap-3">
         {expenses.map(expense => (
         <ExpenseItem key={expense.id} expense={expense} onDelete={onDeleteExpense} />
         ))}
        </div>
      </div>
    );
}

export default ExpenseList