import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number | string,
  currency: string = "USD"
): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(numAmount);
}

export function formatDateToLocalString(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // For today's date
  const today = new Date();
  if (dateObj.toDateString() === today.toDateString()) {
    return `Today, ${dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  // For yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateObj.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }

  // For other dates
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function calculateBudgetPercentage(
  spent: number | string,
  total: number | string
): number {
  const spentNum = typeof spent === "string" ? parseFloat(spent) : spent;
  const totalNum = typeof total === "string" ? parseFloat(total) : total;

  if (totalNum === 0) return 0;

  const percentage = (spentNum / totalNum) * 100;
  return Math.min(percentage, 100); // Cap at 100%
}

export function getBudgetStatus(
  spent: number | string,
  total: number | string
): "under" | "near" | "over" {
  const percentage = calculateBudgetPercentage(spent, total);

  if (percentage > 100) return "over";
  if (percentage >= 85) return "near";
  return "under";
}

export function getTransactionStatusColor(type: string): string {
  return type === "income" ? "text-green-600" : "text-red-600";
}

export function getCategoryIcon(iconName: string): string {
  // Default to more icon if not found
  return iconName || "ri-more-line";
}

export const chartColors = [
  "#6FBBB6", // primary teal
  "#F59E0B", // amber
  "#4F46E5", // indigo
  "#EC4899", // pink
  "#8B5CF6", // purple
  "#10B981", // emerald
  "#5AA9A4", // dark teal
  "#D1E9E5", // light teal
  "#EF4444", // red
  "#6B7280", // gray
];
