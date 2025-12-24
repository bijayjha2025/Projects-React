
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

  const [editingExpense, setEditingExpense] = useState(null);

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

  const updateExpense = (id, updatedData) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? {...expense, ...updatedData} : expense
    ));
    setEditingExpense(null);
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  } 

  const clearAllExpenses = () => {
    if (window.confirm('Are you sure you want to delete all expenses?')){
      setExpenses([]);
    }
  }

  const startEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const cancelEdit = () => {
    setEditingExpense(null);
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pb-12">
        < Header />

        <div className="max-w-2xl mx-auto mt-8 space-y-6">
         < ExpenseForm onAddExpense = {addExpense} onUpdateExpense = {updateExpense} editingExpense = {editingExpense} onCancelEdit= {cancelEdit}/>
         < ExpenseSummary expenses={expenses} />
         < ExpenseList expenses = {expenses} onDeleteExpense= {deleteExpense} onEditExpense = {startEdit} onClearAll={clearAllExpenses}/>
        </div>
      </div>
    </>
  )
}

export default App;
