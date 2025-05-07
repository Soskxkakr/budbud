export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  spent: number;
  period: string;
  startDate: string;
  endDate: string;
}

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
  },
  {
    id: "2",
    userId: "1",
    name: "Bank Account",
    type: "checking",
    balance: 5000,
    currency: "MYR",
  },
  {
    id: "3",
    userId: "1",
    name: "Credit Card",
    type: "credit",
    balance: -2000,
    currency: "MYR",
  },
];

export const budgets: Budget[] = [
  {
    id: "1",
    userId: "123",
    categoryId: "1",
    amount: 500,
    spent: 200,
    period: "2023",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  },
  {
    id: "2",
    userId: "123",
    categoryId: "2",
    amount: 300,
    spent: 100,
    period: "2023",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  },
  {
    id: "3",
    userId: "123",
    categoryId: "3",
    amount: 700,
    spent: 400,
    period: "2023",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  },
];
