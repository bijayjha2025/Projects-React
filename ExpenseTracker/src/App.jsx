
import './App.css'
import Header from './Components/Header.jsx';
import ExpenseForm from './Components/ExpenseForm.jsx';
import { useState } from 'react';
import ExpenseList from './Components/ExpenseList.jsx';
import ExpenseSummary from './Components/ExpenseSummary.jsx';

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expenseData) => {
    const newExpense = {
      ...expenseData,
      id: Date.now()
    }
    setExpenses([newExpense, ...expenses]);
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  } 

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 pb-12">
        < Header />
        < ExpenseForm onaddExpense = {addExpense} />
        < ExpenseSummary expenses={expenses} />
        < ExpenseList expenses = {expenses} onDeleteExpense= {deleteExpense} />
      </div>
    </>
  )
}

export default App;
