
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
        <div>
            <div>
                <p>Total Spending</p>
                <p>${totalSpending.toFixed(2)}</p>
            </div>

            <div>
                <h3>Spending by category</h3>
                <div> {categoriesPercentage.map(({ category, amount, percentage}) => (
                    <div key={category}>
                        <div>
                            <span>{category}</span>
                            <span>{amount.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div className={`h-full ${categoryColors[category]} rounded-full transition-all duration-500`}
                            style={{width: `${percentage}%`}}
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-1 text-right">{percentage.toFixed(1)}%</p>
                        </div>      
                ))}
                </div>
            </div>
        </div>
    );
}

export default ExpenseSummary