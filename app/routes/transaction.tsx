import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { TransactionForm } from "~/components/transaction/transaction-form";
import { formatCurrency, formatDateToLocalString } from "~/lib/utils";
import { accounts, categories, transactions } from "~/data/dummy-data";

const Transactions = () => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [accountFilter, setAccountFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("newest");

  if (false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const filteredTransactions = transactions
    ?.filter((transaction) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (transaction.merchant &&
          transaction.merchant
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory =
        categoryFilter === "all" || transaction.categoryId === categoryFilter;

      // Account filter
      const matchesAccount =
        accountFilter === "all" || transaction.accountId === accountFilter;

      return matchesSearch && matchesCategory && matchesAccount;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      } else if (sortOrder === "oldest") {
        return dateA - dateB;
      } else if (sortOrder === "highest") {
        return Number(b.amount) - Number(a.amount);
      } else {
        return Number(a.amount) - Number(b.amount);
      }
    });

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
            <p className="mt-1 text-sm text-gray-500">
              View and manage all your financial transactions
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button onClick={() => setShowTransactionModal(true)}>
              <i className="ri-add-line mr-2"></i>
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={accountFilter} onValueChange={setAccountFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    {accounts?.map((account) => (
                      <SelectItem
                        key={account.id}
                        value={account.id.toString()}
                      >
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Amount</SelectItem>
                    <SelectItem value="lowest">Lowest Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-center">Recurring</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-10 text-gray-500"
                      >
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <i className="ri-file-list-3-line text-4xl"></i>
                          <p>No transactions found</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowTransactionModal(true)}
                          >
                            Add Transaction
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions?.map((transaction) => {
                      const category = categories?.find(
                        (c) => c.id === transaction.categoryId
                      );
                      const account = accounts?.find(
                        (a) => a.id === transaction.accountId
                      );
                      const isIncome = transaction.type === "income";

                      return (
                        <TableRow
                          key={transaction.id}
                          className="hover:bg-gray-50"
                        >
                          <TableCell>
                            <div className="flex items-center">
                              <div
                                className={`flex-shrink-0 h-8 w-8 rounded-full ${
                                  isIncome ? "bg-green-100" : "bg-blue-100"
                                } flex items-center justify-center`}
                              >
                                <i
                                  className={`${
                                    category?.icon || "ri-question-mark"
                                  } ${
                                    isIncome
                                      ? "text-green-600"
                                      : "text-blue-600"
                                  }`}
                                ></i>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {transaction.description}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {transaction.merchant}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                isIncome
                                  ? "success"
                                  : category?.name === "Entertainment"
                                  ? "purple"
                                  : "info"
                              }
                            >
                              {category?.name || "Uncategorized"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {formatDateToLocalString(transaction.date)}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {account?.name || "Unknown"}
                          </TableCell>
                          <TableCell
                            className={`text-sm font-medium ${
                              isIncome ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {isIncome ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell className="text-center">Y</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-secondary hover:text-primary"
                              >
                                <i className="ri-edit-line mr-1"></i>
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-200"
                              >
                                <i className="ri-delete-bin-line mr-1"></i>
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {transactions && transactions.length > 0 && (
              <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">{transactions.length}</span>{" "}
                    of{" "}
                    <span className="font-medium">{transactions.length}</span>{" "}
                    transactions
                  </div>
                  <div className="flex-1 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="mr-2"
                    >
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        accounts={accounts}
        categories={categories}
      />
    </div>
  );
};

export default Transactions;
