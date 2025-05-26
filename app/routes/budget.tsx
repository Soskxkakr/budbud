import { useState } from "react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import type { Budget, Category } from "~/types/api";
import { budgets, categories } from "~/data/dummy-data";
import BudgetCard from "~/components/budget/budget-card";
import BudgetSummary from "~/components/budget/budget-summary";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "~/components/ui/toast";
import { NavLink } from "react-router";

const Budget = () => {
  const [showToast, setShowToast] = useState(false);
  const [budgetsData, setbudgetsData] = useState<Budget[]>(budgets);
  const [categoriesData, setcategoriesData] =
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

  return (
    <div className="py-6">
      <Toast open={showToast} onOpenChange={setShowToast}>
        <ToastTitle>Account</ToastTitle>
        <ToastDescription>
          Manage your accounts and transactions here.
        </ToastDescription>
        <ToastClose />
      </Toast>
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
            <Button asChild>
              <NavLink to="/budgets/new">
                <i className="ri-add-line mr-2"></i>
                Create New Budget
              </NavLink>
            </Button>
          </div>
        </div>

        {/* Overall Budget Summary */}
        <BudgetSummary totalBudget={totalBudget} totalSpent={totalSpent} />

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
            budgetsData?.map((budget) => 
              <BudgetCard
                key={budget.id}
                budget={budget}
                categoriesData={categoriesData}
                showToast={() => setShowToast(true)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Budget;
