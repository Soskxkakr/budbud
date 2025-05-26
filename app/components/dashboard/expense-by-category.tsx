import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { chartColors, formatCurrency } from "~/lib/utils";

interface ExpenseByCategoryProps {
  expenseData: Array<{
    category: {
      id: string;
      name: string;
      icon: string;
      color: string;
    };
    total: number;
  }>;
}

export function ExpenseByCategory({ expenseData }: ExpenseByCategoryProps) {
  const [timeRange, setTimeRange] = useState("this-month");

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.total, 0);

  // Transform data for the pie chart
  const chartData = expenseData.map((item, index) => ({
    name: item.category.name,
    value: item.total,
    color: item.category.color || chartColors[index % chartColors.length],
  }));

  return (
    <Card>
      <CardHeader className="flex items-center justify-between p-5 border-b border-gray-200">
        <CardTitle className="text-lg font-medium text-gray-900">
          Expense by Category
        </CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-5">
        {chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center">
            <p className="text-sm text-gray-500">No expense data available.</p>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(name) => `Category: ${name}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="space-y-2 mt-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  style={{ backgroundColor: item.color }}
                  className="w-4 h-4 rounded-full mr-2"
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(item.value)}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  (
                  {totalExpenses
                    ? Math.round((item.value / totalExpenses) * 100)
                    : 0}
                  %)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
