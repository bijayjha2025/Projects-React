
function ExpenseItem({ expense, onDelete }){
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric' });
    }
    return(
        <div>
         <div>
          <div>
            <span>{expense.category}</span>
            <span>{formatDate(expense.date)}</span>
          </div>
          {expense.note && ( <p>{expense.note}</p>)}
         </div>

         <div>
          <span>${expense.amount.toFixed(2)}</span>
           <button onClick={()=> onDelete(expense.id)}>Delete</button>
         </div>
    
        </div>
    );
}

export default ExpenseItem