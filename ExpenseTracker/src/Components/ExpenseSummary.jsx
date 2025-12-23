
import { FormatCurrency } from "../Utilities/FormatCurrency";

function ExpenseSummary({expenses}){

    const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const categoryArray = Object.entries(categoryTotals).map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount);

    const categoriesPercentage = categoryArray.map(item => ({
        ...item,
        percentage: totalSpending > 0 ? (item.amount / totalSpending) * 100 : 0
    }));

    const categoryColors = {
        Food: 'bg-orange-500',
        Transportation: 'bg-blue-500',
        Rent: 'bg-purple-500',
        Entertainment: 'bg-yellow-500',
        Shopping: 'bg-green-500',
        Other: 'bg-gray-500'
    };

    if (expenses.length === 0) {
        return null;
    }

    return(
        <div className="p-8 bg-white rounded-3xl shadow-lg border border-amber-100">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-amber-900 mb-4 font-story">Spending by category</h3>
                <div className="space-y-4"> {categoriesPercentage.map(({ category, amount, percentage}) => (
                    <div key={category}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700 font-medium">{category}</span>
                            <span className="text-gray-900 font-bold">Rs. {FormatCurrency(amount)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div className={`h-full ${categoryColors[category]} rounded-full transition-all duration-500`}
                            style={{width: `${percentage}%`}}/></div>
                        <p className="text-sm text-gray-500 mt-1 text-right">{percentage.toFixed(1)}%</p>
                        </div>      ))}
                </div>
            </div>

            <div className="text-center pt-6 border-t-2 border-amber-200">
                <p className="text-gray-600 text-lg mb-2 font-story">Total Spending</p>
                <p className="text-4xl font-bold text-amber-900 font-story">Rs. {FormatCurrency(totalSpending)}</p>
            </div>
        </div>
    );
}

export default ExpenseSummary