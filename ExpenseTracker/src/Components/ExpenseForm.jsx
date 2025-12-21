
import {useState} from 'react'

function ExpenseForm(){

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");

    return(
        <form>
            <input type="number" placeholder="Amount" value= {amount} onChange={(e) => setAmount(e.target.value)}/>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Rent">Rent</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
            </select>

            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>

            <input type="text" placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)}/>

            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm