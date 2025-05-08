import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { calculateBudgetPercentage, formatCurrency } from "~/lib/utils";
import type { Budget, Category } from "~/types/api";
import { budgets, categories } from "~/data/dummy-data";

const Budget = () => {
  const [budgetsData, setbudgetsDataData] = useState<Budget[]>(budgets);
  const [categoriesData, setcategoriesDataData] =
    useState<Category[]>(categories);

  if (false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate total budget and spent amounts
  const totalBudget =
    budgetsData?.reduce((sum, budget) => sum + Number(budget.amount), 0) || 0;
  const totalSpent =
    budgetsData?.reduce((sum, budget) => sum + Number(budget.spent), 0) || 0;
  const overallPercentage = calculateBudgetPercentage(totalSpent, totalBudget);

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Budget Management
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Track your spending against planned budgets
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button>
              <i className="ri-add-line mr-2"></i>
              Create New Budget
            </Button>
          </div>
        </div>

        {/* Overall Budget Summary */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Overall Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Total Budget</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalBudget)}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Total Spent</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalSpent)}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Remaining</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalBudget - totalSpent)}
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
                    {formatCurrency(totalSpent)} of{" "}
                    {formatCurrency(totalBudget)}
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

        {/* Budget Categories */}
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Budget Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetsData?.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <i className="ri-pie-chart-line text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Budgets Created
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Start managing your finances by creating a budget
              </p>
              <Button>Create Your First Budget</Button>
            </div>
          ) : (
            budgetsData?.map((budget) => {
              const category = categoriesData?.find(
                (c) => c.id === budget.categoryId
              );
              const percentage = calculateBudgetPercentage(
                budget.spent,
                budget.amount
              );
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
                      <Button variant="ghost" size="icon">
                        <i className="ri-more-2-fill"></i>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Monthly Budget
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(budget.amount)}
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
                            {formatCurrency(budget.spent)}
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
                              Number(budget.amount) - Number(budget.spent)
                            )}{" "}
                            left
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between pt-2">
                        <Button variant="outline" size="sm">
                          <i className="ri-edit-line mr-1"></i>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <i className="ri-eye-line mr-1"></i>
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}

          {/* Add Budget Card */}
          <Card className="border-dashed border-2 flex flex-col items-center justify-center text-center p-6 h-full hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <i className="ri-add-line text-gray-500 text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Add New Budget
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Set spending limits for different categories
            </p>
            <Button variant="outline">Create Budget</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Budget;
