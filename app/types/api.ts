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
  isPrimary: boolean;
  icon: string;
  iconColor: string;
  iconBgColor: string;
}

export interface Budget {
  id: string;
  userId: string;
  name: string;
  categoryId: string;
  amount: number;
  spent: number;
  currency: string;
  period: string;
  startDate: string;
  endDate: string;
}

export interface SpendingOverviewData {
  month: string;
  expenses: number;
  income: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  userId: string;
  categoryId: string;
  amount: number;
  description: string;
  merchant?: string;
  date: string;
  isRecurring: boolean;
  type: "income" | "expense";
}

export interface RecentTransactionData {
  transactions: Transaction[];
  categories: Category[];
}

export interface ExpenseByCategoryData {
  category: Category;
  total: number;
}
