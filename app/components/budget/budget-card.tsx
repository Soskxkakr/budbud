import { NavLink } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { calculateBudgetPercentage, formatCurrency } from "~/lib/utils"
import type { Category, Budget } from "~/types/api"
    
const BudgetCard = ({budget, categoriesData, showToast}: {budget: Budget, categoriesData: Category[], showToast: () => void}) => {
    const category = categoriesData?.find((c) => c.id === budget.categoryId);
    const percentage = calculateBudgetPercentage(budget.spent, budget.amount);
    const isOverBudget = Number(budget.spent) > Number(budget.amount);

    return (
      <Card
        key={budget.id}
        className="transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <i
                  className={`${
                    category?.icon || "ri-question-mark"
                  } text-gray-600`}
                ></i>
              </div>
              <CardTitle>{category?.name || "Unknown"}</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-primary bordcer-transparent border-1 border-transparent h-10 w-10">
                  <i className="ri-more-2-fill"></i>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  <NavLink to={`/budgets/${budget.id}`}>Details</NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-500 focus:text-red-700 focus:bg-red-200"
                  onClick={showToast}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Monthly Budget
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(budget.amount, budget.currency)}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Spent</span>
                <span
                  className={`text-sm font-medium ${
                    isOverBudget ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  {formatCurrency(budget.spent, budget.currency)}
                </span>
              </div>
              <Progress
                value={percentage}
                indicatorColor={
                  isOverBudget ? "bg-red-500" : "bg-primary"
                }
              />
              <div className="flex justify-between text-xs">
                <span
                  className={
                    isOverBudget ? "text-red-500" : "text-gray-500"
                  }
                >
                  {isOverBudget
                    ? `${Math.round(
                        (Number(budget.spent) /
                          Number(budget.amount) -
                          1) *
                          100
                      )}% over budget`
                    : `${Math.round(percentage)}% of budget used`}
                </span>
                <span className="text-gray-500">
                  {formatCurrency(
                    Number(budget.amount) - Number(budget.spent), budget.currency
                  )}{" "}
                  left
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>       
    )
}

export default BudgetCard