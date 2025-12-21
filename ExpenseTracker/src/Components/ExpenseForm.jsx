
import {useState} from 'react'
import ErrorMessage from './ErrorMessage.jsx';

function ExpenseForm(){

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [showError, setshowError] = useState(false);

    const handleSubmit= (e) => {
        e.preventDefault();

        if (!amount || !category || !date){
            setshowError(true);
            setTimeout(() => setshowError(false), 3000);
            return;
        }

        const expenseData = {
            amount: Number(amount),
            category,
            date,
            note
        };

        console.log("Saved", expenseData);

        setAmount("");
        setCategory("");
        setDate("");
        setNote("");
    }

    return(
        <>
        {showError && <ErrorMessage message= "Fill all required fields" onClose={() => setshowError(false)} /> }

        <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-lg border border-amber-50">
         <h2 className="text-3xl font-bold text-amber-900 mb-6 font-story">Add New</h2>

         <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="number" placeholder="Amount" value= {amount} onChange={(e) => setAmount(e.target.value)} className='p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none transition-all'/>

            <select value={category} onChange={(e) => setCategory(e.target.value)} className='p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 hover: ring-mber-200 outline-none text-gray-600'>
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Rent">Rent</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
            </select>
            <div className="flex gap-4">
             <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className='flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 hover:border-amber-200 outline-none text-gray-600'/>

             <input type="text" placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} className='flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 hover:border-amber-200 outline-none placeholder:text-gray-400'/>
            </div>

            <button type="submit" className='mt-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 rounded-2xl shadow-md transform active:scale-95 transition-all'>Add Expense</button>
         </form>
        </div>
        </>
    );
};

export default ExpenseForm