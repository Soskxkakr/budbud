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

interface Account {
  id: string;
  userId: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  categoryId: number;
  amount: number;
  description: string;
  merchant?: string;
  date: string;
  isRecurring: boolean;
  type: "income" | "expense";
}

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
                    {/* {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))} */}
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
                    {/* {accounts?.map((account) => (
                      <SelectItem key={account.id} value={account.id.toString()}>
                        {account.name}
                      </SelectItem>
                    ))} */}
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {true ? (
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
                    <></>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {/* {filteredTransactions && filteredTransactions.length > 0 && (
              <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">{filteredTransactions.length}</span> of{" "}
                    <span className="font-medium">{filteredTransactions.length}</span> transactions
                  </div>
                  <div className="flex-1 flex justify-end">
                    <Button variant="outline" size="sm" disabled className="mr-2">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )} */}
          </CardContent>
        </Card>
      </div>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        accounts={[
          {
            id: "1",
            userId: "1",
            name: "Wallet",
            type: "savings",
            balance: 10000,
            currency: "MYR",
          },
        ]}
        categories={[
          {
            id: "1",
            name: "Food",
            icon: "ri-restaurant-line",
            color: "red",
          },
        ]}
      />
    </div>
  );
};

export default Transactions;
