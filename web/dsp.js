    // Object to store expenses grouped by year
    let expensesByYear = {};

    // Function to add an expense
    function addExpense() {
      // Get input elements
      const dateInput = document.querySelector('.form-control[type="date"]');
      const descriptionInput = document.querySelector('.form-control[type="text"]');
      const amountInput = document.querySelector('.form-control[type="number"]');
      const expenseTypeSelect = document.querySelector('.form-select');

      // Retrieve input values
      const date = dateInput.value;
      const description = descriptionInput.value;
      const amount = parseFloat(amountInput.value);
      const expenseType = expenseTypeSelect.value;

      // Get the current year
      const currentYear = (new Date()).getFullYear().toString();

      // Check if expenses for the current year exist, if not, initialize the data structures
      if (!expensesByYear.hasOwnProperty(currentYear)) {
        expensesByYear[currentYear] = [];
      }
      const id = expensesByYear[currentYear].length + 1;

      // Create the expense object
      const expense = {
        id: id,
        date: date,
        description: description,
        amount: amount,
        type: expenseType
      };

      // Add the expense to the expenses array for the current year
      expensesByYear[currentYear].push(expense);

      // Refresh the expenses table
      refreshExpensesTable();

      // Clear input fields
      dateInput.value = '';
      descriptionInput.value = '';
      amountInput.value = '';
      expenseTypeSelect.selectedIndex = 0;
    }

    // Function to refresh the expenses table
    function refreshExpensesTable() {
      // Get the expenses table container element
      const expensesTableContainer = document.getElementById('expensesTableContainer');

      // Clear the container
      expensesTableContainer.innerHTML = '';

      // Iterate over the expensesByYear object
      for (const year in expensesByYear) {
        if (expensesByYear.hasOwnProperty(year)) {
          // Get the expenses array for the current year
          const expenses = expensesByYear[year];

          // Create a table for the current year
          const table = document.createElement('table');
          table.className = 'table expense-table';
          table.innerHTML = '<thead><tr><th>ID</th><th>Date</th><th>Description</th><th>Amount</th><th>Type</th></tr></thead><tbody></tbody>';

          // Get the table body
          const tableBody = table.getElementsByTagName('tbody')[0];

          // Iterate over the expenses array and populate the table rows
          expenses.forEach((expense) => {

            const row = tableBody.insertRow();
            const idCell = row.insertCell();
            idCell.textContent = expense.id;
            const dateCell = row.insertCell();
            dateCell.textContent = expense.date;
            const descriptionCell = row.insertCell();
            descriptionCell.textContent = expense.description;
            const amountCell = row.insertCell();
            amountCell.textContent = expense.amount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'EUR'
            });
            const typeCell = row.insertCell();
            typeCell.textContent = expense.type;
          });

          // Append the table to the container
          expensesTableContainer.appendChild(table);
        }
      }
    }

    // Get the expense form element
    const expenseForm = document.querySelector('.expense-form');

    // Add event listener to expense form submit event
    expenseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addExpense();
    });