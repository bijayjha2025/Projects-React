
export const generatePrintContent = (shoppingList, mealPlan) => {
  const mealsForWeek = Object.entries(mealPlan)
    .filter(([_, recipes]) => recipes.length > 0)
    .map(([day, recipes]) => ({
      day,
      meals: recipes.map(r => r.strMeal)
    }));
  
  const totalMeals = mealsForWeek.reduce((acc, day) => acc + day.meals.length, 0);
  const daysPlanned = mealsForWeek.length;
  const documentId = `MP-${Date.now().toString().slice(-8)}`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Shopping List - मीठो गाँस</title>
      <style>
        body { 
          font-family: 'Arial', sans-serif; 
          padding: 20px; 
          color: #333;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .letterHead {
          text-align: center;
          border-bottom: 3px solid #a7f1a0;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .brandName {
          font-size: 28px;
          font-weight: bold;
          color: #58e633;
          margin-bottom: 5px;
        }
        
        .brandTagline {
          color: #666;
          font-size: 14px;
          margin-bottom: 10px;
        }
        
        .documentInfo {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 14px;
          color: #666;
        }
        
        .mealSummary {
          background: #f8f9fa;
          padding: 15px;
          margin: 20px 0;
          border-radius: 8px;
          border-left: 4px solid #a7f1a0;
        }
        
        .mealSummary h3 {
          margin-top: 0;
          color: #2d3748;
        }
        
        .shoppingHeader {
          background: #58e633;
          color: white;
          padding: 10px 15px;
          border-radius: 6px;
          margin: 25px 0 15px 0;
        }
        
        .ingredient {
          padding: 10px 0;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          page-break-inside: avoid;
        }
        
        .checkbox {
          margin-right: 12px;
          width: 18px;
          height: 18px;
        }
        
        .itemName {
          font-weight: 600;
          flex: 1;
        }
        
        .itemMeasure {
          color: #718096;
          font-style: italic;
          min-width: 120px;
          text-align: right;
        }
        
        .footer {
          margin-top: 40px;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #718096;
          font-size: 12px;
        }
        
        .qr-placeholder {
          width: 80px;
          height: 80px;
          background: #f1f5f9;
          margin: 10px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          font-size: 10px;
        }
        
        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }
          
          body {
            padding: 0;
          }
          
          .no-print {
            display: none;
          }
          
          .ingredient {
            break-inside: avoid;
          }
          
          .shopping-header {
            break-after: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="letterHead">
        <div class="brandName">🍽️ मीठो गाँस</div>
        <div class="brandTagline">Smart Meal Planning, Effective Shopping</div>
        <div style="font-size: 12px; color: #a0aec0;">www.mithogaas.vercel | contact@mithogaas@gmail.com</div>
      </div>
      
      <div class="documentInfo">
        <div>
          <strong>Generated:</strong> ${new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div>
          <strong>Document ID:</strong> ${documentId}
        </div>
      </div>
      
      ${mealsForWeek.length > 0 ? `
        <div class="mealSummary">
          <h3>📅 This Week's Meal Plan</h3>
          ${mealsForWeek.map(dayPlan => `
            <p><strong>${dayPlan.day}:</strong> ${dayPlan.meals.join(', ')}</p>
          `).join('')}
          <p style="margin-top: 10px; font-size: 14px; color: #4a5568;">
            <strong>Total meals:</strong> ${totalMeals} 
            • <strong>Days planned:</strong> ${daysPlanned}/7
          </p>
        </div>
      ` : ''}
      
      <div class="shoppingHeader">
        <h2 style="margin: 0; font-size: 20px;">🛒 Shopping List</h2>
        <div style="font-size: 14px; opacity: 0.9;">${shoppingList.length} items to purchase</div>
      </div>
      
      ${shoppingList.map((item, index) => `
        <div class="ingredient">
          <input type="checkbox" class="checkbox"> 
          <div class="itemName">${item.name}</div>
          <div class="itemMeasure">${item.measure}</div>
        </div>
      `).join('')}
      
      <div class="footer">
        <div style="margin-bottom: 15px;">
          A practice project by Bijay Jha<br>
          <strong>The smart way to plan meals, save time, and eat healthy<strong><br>
        </div>
        
        <div style="margin-top: 20px; font-size: 10px; color: #cbd5e0;">
          Document ID: ${documentId} • ${new Date().toISOString().split('T')[0]} 
        </div>
      </div>
      
      <script>
        window.onload = () => {
          document.querySelectorAll('.checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
              const ingredient = this.closest('.ingredient');
              if (this.checked) {
                ingredient.style.opacity = '0.6';
                ingredient.style.textDecoration = 'line-through';
              } else {
                ingredient.style.opacity = '1';
                ingredient.style.textDecoration = 'none';
              }
            });
          });
          
          window.print();
          
          window.onafterprint = function() {
            setTimeout(() => {
              if (!window.closed) {
                window.close();
              }
            }, 500);
          };
        };
      </script>
    </body>
    </html>
  `;
};

export const exportToCSV = (shoppingList) => {
  const headers = ['Item', 'Measurement', 'Quantity'];
  const csvContent = [
    headers.join(','),
    ...shoppingList.map(item => [
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.measure.replace(/"/g, '""')}"`,
      '1'
    ].join(','))
  ].join('\\n');
  
  return csvContent;
};