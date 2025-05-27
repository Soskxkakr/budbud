import { useState } from "react";
import { Progress } from "~/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { calculateBudgetPercentage, formatCurrency } from "~/lib/utils"

const BudgetSummary = ({totalBudget, totalSpent}: {totalBudget: number, totalSpent: number}) => {
  const [timeRange, setTimeRange] = useState("monthly");
  const overallPercentage = calculateBudgetPercentage(totalSpent, totalBudget);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium text-gray-900">Monthly Budget</h2>
            <Select value={timeRange} onValueChange={(value) => setTimeRange(value)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Total Budget</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalBudget, "MYR")}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Total Spent</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalSpent, "MYR")} 
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Remaining</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalBudget - totalSpent, "MYR")}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(overallPercentage)}%
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">
                Budget Usage
              </span>
              <span className="text-sm text-gray-500">
                {formatCurrency(totalSpent, "MYR")} of{" "}
                {formatCurrency(totalBudget, "MYR")}
              </span>
            </div>
            <Progress
              value={overallPercentage}
              indicatorColor={
                overallPercentage > 100 ? "bg-red-500" : "bg-primary"
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BudgetSummary
