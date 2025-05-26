import type {
  Account,
  Budget,
  Category,
  ExpenseByCategoryData,
  RecentTransactionData,
  SpendingOverviewData,
  Transaction,
} from "~/types/api";

export const user = {
  id: "123",
  fullName: "John Doe",
  username: "johndoe",
  email: "john@example.com",
};

export const categories: Category[] = [
  {
    id: "1",
    name: "Food",
    icon: "ri-restaurant-line",
    color: "red",
  },
  {
    id: "2",
    name: "Transportation",
    icon: "ri-car-line",
    color: "blue",
  },
  {
    id: "3",
    name: "Shopping",
    icon: "ri-shopping-cart-line",
    color: "green",
  },
  {
    id: "4",
    name: "Entertainment",
    icon: "ri-movie-line",
    color: "purple",
  },
];

export const accounts: Account[] = [
  {
    id: "1",
    userId: "1",
    name: "Wallet",
    type: "savings",
    balance: 10000,
    currency: "MYR",
    isPrimary: true,
    icon: "ri-bank-line",
    iconColor: "green",
    iconBgColor: "green",
  },
  {
    id: "2",
    userId: "1",
    name: "Bank Account",
    type: "checking",
    balance: 5000,
    currency: "MYR",
    isPrimary: false,
    icon: "ri-safe-2-line",
    iconColor: "blue",
    iconBgColor: "blue",
  },
  {
    id: "3",
    userId: "1",
    name: "Credit Card",
    type: "credit",
    balance: -2000,
    currency: "MYR",
    isPrimary: false,
    icon: "ri-bank-card-line",
    iconColor: "purple",
    iconBgColor: "purple",
  },
];

export const budgets: Budget[] = [
  {
    id: "1",
    userId: "123",
    name: "Groceries",
    categoryId: "1",
    amount: 500,
    spent: 200,
    currency: "MYR",
    period: "2023",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  },
  {
    id: "2",
    userId: "123",
    name: "Fuel",
    categoryId: "2",
    amount: 300,
    spent: 100,
    currency: "MYR",
    period: "2023",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  },
  {
    id: "3",
    userId: "123",
    name: "Shopping",
    categoryId: "3",
    amount: 700,
    spent: 400,
    currency: "MYR",
    period: "2023",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  },
];

export const spendings: SpendingOverviewData[] = [
  {
    month: "JAN",
    expenses: 200,
    income: 100,
  },
  {
    month: "FEB",
    expenses: 300,
    income: 1000,
  },
  {
    month: "MAR",
    expenses: 400,
    income: 1500,
  },
];

export const transactions: Transaction[] = [
  {
    id: "1",
    accountId: "1",
    userId: "1",
    isRecurring: false,
    merchant: "Tesco",
    description: "Groceries",
    amount: 50,
    date: "2023-01-01",
    type: "expense",
    categoryId: "1",
  },
  {
    id: "2",
    accountId: "2",
    userId: "1",
    isRecurring: true,
    merchant: "Shell",
    description: "Fuel",
    amount: 100,
    date: "2023-01-02",
    type: "expense",
    categoryId: "2",
  },
  {
    id: "3",
    accountId: "3",
    userId: "1",
    isRecurring: false,
    merchant: "Starbucks",
    description: "Coffee",
    amount: 20,
    date: "2023-01-03",
    type: "expense",
    categoryId: "4",
  },
];

export const expensesByCategory: ExpenseByCategoryData[] = [
  {
    category: categories[0],
    total: 200,
  },
  {
    category: categories[1],
    total: 300,
  },
  {
    category: categories[2],
    total: 400,
  },
  {
    category: categories[3],
    total: 600,
  },
];

export const dashboardData = {
  totalBalance: 10000,
  monthlyIncome: 20000,
  monthlyExpenses: 6000,
  totalSavings: 5000,
  recentTransactions: transactions.slice(0, 5),
  budgets,
  expensesByCategory,
  spendingOverview: spendings,
};
