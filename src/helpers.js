export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

// Generate Colors
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Local Storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Create Budget
export const createBudget = ({ name, amount }) => {
  const newBudget = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newBudget])
  );
};

// Edit Budget
export const editBudget = ({ id, name, amount }) => {
  const existingBudgets = fetchData("budgets") ?? [];
  const updatedBudgets = existingBudgets.map((budget) =>
    budget.id === id ? { ...budget, name, amount: +amount } : budget
  );
  return localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
};

// Create Expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newExpense])
  );
};

// Edit Expense
export const editExpense = ({ id, name, amount, budgetId }) => {
  const existingExpenses = fetchData("expenses") ?? [];
  const updatedExpenses = existingExpenses.map((expense) =>
    expense.id === id
      ? { ...expense, name, amount: +amount, createdAt: Date.now(), budgetId }
      : expense
  );
  return localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
};

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] == value);
};

// Delete Item
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// Formatting

// Format Currency
export const formateCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

// Formate Percentage
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleString("en-GB", { hour12: true });

// Total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};
