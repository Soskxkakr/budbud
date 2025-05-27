import { NavLink } from "react-router";
import { MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { formatCurrency, formatDateToLocalString } from "~/lib/utils";
import type { RecentTransactionData } from "~/types/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function RecentTransactions({
  transactions,
  categories,
}: RecentTransactionData) {
  const filteredTransactions = transactions.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between p-5 border-b border-gray-200">
        <CardTitle className="text-lg font-medium text-gray-900">
          Recent Transactions
        </CardTitle>
        <NavLink to="/transactions">
          <Button
            variant="link"
            className="text-sm font-medium text-primary hover:text-primary-dark cursor-pointer"
          >
            View All
          </Button>
        </NavLink>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="relative">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-sm text-gray-500"
                  >
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => {
                  const category = categories.find(
                    (c) => c.id === transaction.categoryId
                  );
                  const isIncome = transaction.type === "income";

                  return (
                    <TableRow key={transaction.id} className="hover:bg-gray-50">
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
                                isIncome ? "text-green-600" : "text-blue-600"
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
                          className="text-xs"
                          style={{ backgroundColor: category?.color || "#ccc" }}
                        >
                          {category?.name || "Uncategorized"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {formatDateToLocalString(transaction.date)}
                      </TableCell>
                      <TableCell
                        className={`text-sm font-medium ${
                          isIncome ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(transaction.amount, "MYR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <div className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-primary bordcer-transparent border-1 border-transparent h-10 w-10">
                              <i className="ri-more-2-fill"></i>
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem className="cursor-pointer">
                              <NavLink to={`/transactions/${transaction.id}`}>Edit</NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer text-red-500 focus:text-red-700 focus:bg-red-200"
                              onClick={() => {}}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{transactions.length}</span> of{" "}
              <span className="font-medium">{transactions.length}</span>{" "}
              transactions
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
      </CardContent>
    </Card>
  );
}
