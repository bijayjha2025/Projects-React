
import './App.css'
import Header from './Components/Header.jsx';
import ExpenseForm from './Components/ExpenseForm.jsx';
import { useState, useEffect } from 'react';
import ExpenseList from './Components/ExpenseList.jsx';
import ExpenseSummary from './Components/ExpenseSummary.jsx';

function App() {

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

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

  const clearAllExpenses = () => {
    if (window.confirm('Are you sure you want to delete all expenses?')){
      setExpenses([]);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 pb-12">
        < Header />

        <div className="max-w-2xl mx-auto mt-8 space-y-6">
         < ExpenseForm onaddExpense = {addExpense} />
         < ExpenseSummary expenses={expenses} />
         < ExpenseList expenses = {expenses} onDeleteExpense= {deleteExpense} onClearAll={clearAllExpenses}/>
        </div>
      </div>
    </>
  )
}

export default App;
