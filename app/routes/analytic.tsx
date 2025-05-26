import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { chartColors, formatCurrency } from "~/lib/utils";
import { categories, dashboardData } from "~/data/dummy-data";
import { useIsMobile } from "~/hooks/use-mobile";

const Analytic = () => {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("this-month");
  const [activeTab, setActiveTab] = useState("overview");

  if (false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please view this in browser
      </div>
    );
  }

  // Transform data for the pie chart
  const expenseData = dashboardData?.expensesByCategory || [];
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.total, 0);

  const pieChartData = expenseData.map((item, index) => ({
    name: item.category.name,
    value: item.total,
    color: item.category.color || chartColors[index % chartColors.length],
  }));

  // Income vs Expense Data
  const monthlyData = dashboardData?.spendingOverview || [];

  // Spending trend (mock additional months if needed)
  const spendingTrend = [...monthlyData];

  // Category comparison data
  const categoryComparisonData = expenseData.map((item) => ({
    name: item.category.name,
    amount: item.total,
    percentage: Math.round((item.total / totalExpenses) * 100),
  }));

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Financial Analytics
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Detailed insights into your financial activity
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Analytics Tabs */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-6"
        >
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="income-expense">Income vs Expense</TabsTrigger>
            <TabsTrigger value="category">Category Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-1">Total Income</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(dashboardData?.monthlyIncome || 0)}
                  </div>
                  <div className="mt-1 text-xs text-green-600">
                    <i className="ri-arrow-up-s-line"></i> 2.1% from last period
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-1">
                    Total Expenses
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(dashboardData?.monthlyExpenses || 0)}
                  </div>
                  <div className="mt-1 text-xs text-red-600">
                    <i className="ri-arrow-up-s-line"></i> 4.3% from last period
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-1">Net Savings</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(
                      (dashboardData?.monthlyIncome || 0) -
                        (dashboardData?.monthlyExpenses || 0)
                    )}
                  </div>
                  <div className="mt-1 text-xs text-green-600">
                    <i className="ri-arrow-up-s-line"></i> 5.7% from last period
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-1">
                    Avg. Daily Spend
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency((dashboardData?.monthlyExpenses || 0) / 30)}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Based on current month
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Income vs Expenses</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => formatCurrency(value as number)}
                      />
                      <Legend />
                      <Bar dataKey="income" name="Income" fill="#72b8b1" />
                      <Bar dataKey="expenses" name="Expenses" fill="#ed2d37" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => formatCurrency(value as number)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Income vs Expense Tab */}
          <TabsContent value="income-expense" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expense Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="income"
                      name="Income"
                      stroke="#72b8b1"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      name="Expenses"
                      stroke="#ed2d37"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Income Sources</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">
                      Income sources data will appear here when available
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Savings Rate</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData.map((item) => ({
                        month: item.month,
                        savingsRate: (
                          ((item.income - item.expenses) / item.income) *
                          100
                        ).toFixed(1),
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar
                        dataKey="savingsRate"
                        name="Savings Rate"
                        fill="#6FBBB6"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Category Analysis Tab */}
          <TabsContent value="category" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={categoryComparisonData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 80,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                    />
                    <Bar dataKey="amount" name="Amount" fill="#6FBBB6">
                      {categoryComparisonData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Spending Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          % of Total
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Trend
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {categoryComparisonData.map((category, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{
                                  backgroundColor:
                                    chartColors[index % chartColors.length],
                                }}
                              ></div>
                              <div className="text-sm font-medium text-gray-900">
                                {category.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(category.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.percentage}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index % 3 === 0 ? (
                              <span className="text-red-500">
                                <i className="ri-arrow-up-s-line"></i> 3.2%
                              </span>
                            ) : index % 3 === 1 ? (
                              <span className="text-green-500">
                                <i className="ri-arrow-down-s-line"></i> 1.8%
                              </span>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={spendingTrend}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      name="Expenses"
                      stroke="#ed2d37"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Forecast</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">
                      Forecast data will appear here as more transactions are
                      recorded
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Adherence</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dashboardData?.budgets.map((budget) => {
                        const category = categories?.find(
                          (c) => c.id === budget.categoryId
                        );
                        const percentage = Math.min(
                          (Number(budget.spent) / Number(budget.amount)) * 100,
                          150
                        );
                        return {
                          name: category?.name || "Unknown",
                          adherence:
                            100 - (percentage > 100 ? percentage - 100 : 0),
                          overspend: percentage > 100 ? percentage - 100 : 0,
                        };
                      })}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis unit="%" />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="adherence"
                        name="Budget Adherence"
                        fill="#72b8b1"
                      />
                      <Bar
                        dataKey="overspend"
                        name="Overspend"
                        fill="#ed2d37"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytic;
