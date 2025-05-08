import { NavLink } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Button } from "~/components/ui/button";
import { calculateBudgetPercentage, formatCurrency } from "~/lib/utils";
import type { Budget, Category } from "~/types/api";

const BudgetProgress = ({
  budgets,
  categories,
}: {
  budgets: Budget[];
  categories: Category[];
}) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between p-5 border-b border-gray-200">
        <CardTitle className="text-lg font-medium text-gray-900">
          Budget Progress
        </CardTitle>
        <NavLink to="/budgets">
          <Button
            variant="link"
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            View All
          </Button>
        </NavLink>
      </CardHeader>
      <CardContent className="p-5 space-y-6">
        {budgets.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500">No budgets created yet.</p>
          </div>
        ) : (
          budgets.map((budget) => {
            const category = categories.find((c) => c.id === budget.categoryId);
            const percentage = calculateBudgetPercentage(
              budget.spent,
              budget.amount
            );
            const isOverBudget = Number(budget.spent) > Number(budget.amount);

            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i
                      className={`${
                        category?.icon || "ri-question-mark"
                      } text-gray-400 mr-2`}
                    ></i>
                    <span className="text-sm font-medium text-gray-700">
                      {category?.name || "Unknown"}
                    </span>
                  </div>
                  <span
                    className={`text-sm ${
                      isOverBudget ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {formatCurrency(budget.spent)} /{" "}
                    {formatCurrency(budget.amount)}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  indicatorColor={isOverBudget ? "bg-red-500" : "bg-primary"}
                />
                <span className="text-xs text-gray-500">
                  {isOverBudget
                    ? `${Math.round(
                        (Number(budget.spent) / Number(budget.amount) - 1) * 100
                      )}% over budget`
                    : `${Math.round(percentage)}% of budget used`}
                </span>
              </div>
            );
          })
        )}

        <div className="pt-3">
          <NavLink to="/budgets/new">
            <Button className="w-full">
              <i className="ri-add-line mr-2"></i>
              Create New Budget
            </Button>
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
