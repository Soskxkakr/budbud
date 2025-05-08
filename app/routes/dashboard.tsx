import { useState } from "react";
import { Banknote, ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { Button } from "~/components/ui/button";
import SummaryCard from "~/components/dashboard/summary-card";
import SpendingOverview from "~/components/dashboard/spending-overview";
import BudgetProgress from "~/components/dashboard/budget-progress";
import { RecentTransactions } from "~/components/dashboard/recent-transactions";
import { ExpenseByCategory } from "~/components/dashboard/expense-by-category";
import { TransactionForm } from "~/components/transaction/transaction-form";
import {
  accounts,
  categories,
  budgets,
  expensesByCategory,
  transactions,
  spendings,
} from "~/data/dummy-data";

const Dashboard = () => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Financial Dashboard
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, John. Here's your financial overview.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button variant="outline">
              <i className="ri-filter-3-line mr-2"></i>
              Filter
            </Button>
            <Button onClick={() => setShowTransactionModal(true)}>
              <i className="ri-add-line mr-2"></i>
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <SummaryCard
            title="Total Balance"
            value={10000}
            percentChange={3.4}
            icon={<Wallet />}
            iconBgClass="bg-blue-100"
            iconTextClass="text-blue-600"
          />
          <SummaryCard
            title="Monthly Income"
            value={20000}
            percentChange={2.1}
            icon={<ArrowDownCircle />}
            iconBgClass="bg-green-100"
            iconTextClass="text-green-600"
          />
          <SummaryCard
            title="Monthly Expenses"
            value={6000}
            percentChange={-4.3}
            icon={<ArrowUpCircle />}
            iconBgClass="bg-red-100"
            iconTextClass="text-red-600"
          />

          <SummaryCard
            title="Total Savings"
            value={20000}
            percentChange={8.2}
            icon={<Banknote />}
            iconBgClass="bg-purple-100"
            iconTextClass="text-purple-600"
          />
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section - Spending Overview */}
          <div className="lg:col-span-2">
            <SpendingOverview data={spendings} />
          </div>

          {/* Budget Progress */}
          <div className="lg:col-span-1">
            <BudgetProgress budgets={budgets} categories={categories} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <RecentTransactions
              transactions={transactions}
              categories={categories}
            />
          </div>

          {/* Expense by Category */}
          <div className="lg:col-span-1">
            <ExpenseByCategory expenseData={expensesByCategory} />
          </div>
        </div>
      </div>

      <TransactionForm
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        accounts={accounts}
        categories={categories}
      />
    </div>
  );
};

export default Dashboard;
