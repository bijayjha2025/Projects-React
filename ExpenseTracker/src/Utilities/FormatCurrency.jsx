
export const FormatCurrency = (amount) => {
    return amount.toLocaleString('en-NP', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
};