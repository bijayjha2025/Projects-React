
import { generatePrintContent, exportToCSV } from '../utils/printUtils';

export const usePrint = () => {
  const handlePrint = (shoppingList, mealPlan) => {
    const printWindow = window.open('', '_blank');
    const printContent = generatePrintContent(shoppingList, mealPlan);
    
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const handleExportCSV = (shoppingList) => {
    const csvContent = exportToCSV(shoppingList);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `shopping-list-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (shoppingList, checkedItems) => {
    const text = shoppingList.map((item, index) => {
      const checkbox = checkedItems?.has(index) ? '[✓]' : '[ ]';
      return `${checkbox} ${item.name} - ${item.measure}`;
    }).join('\\n');
    
    return navigator.clipboard.writeText(text);
  };

  return {
    handlePrint,
    handleExportCSV,
    copyToClipboard
  };
};