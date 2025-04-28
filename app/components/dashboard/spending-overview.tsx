import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "~/lib/utils";

interface SpendingOverviewProps {
  data: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
}

const SpendingOverview = ({ data }: SpendingOverviewProps) => {
  const [timeRange, setTimeRange] = useState("this-month");

  return (
    <Card>
      <CardHeader className="flex items-center justify-between p-5 border-b border-gray-200">
        <CardTitle className="text-lg font-medium text-gray-900">
          Spending Overview
        </CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-5">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(month) => `Month: ${month}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#16A34A"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#DC2626"
                strokeWidth={3}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm text-gray-600">Income</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            <span className="text-sm text-gray-600">Expenses</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingOverview;
