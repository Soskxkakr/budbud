import type { Route } from "./+types/account";
import type { Account, Transaction } from "~/types/api";
import { accounts, transactions, categories } from "~/data/dummy-data";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { NavLink } from "react-router";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatCurrency, formatDateToLocalString } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { COLORS, CURRENCIES, ICONS } from "~/data/constants";

export async function loader({ params }: Route.LoaderArgs): Promise<{
  account: Account;
  accountTransactions: Transaction[];
} | null> {
  const { accountId } = params;

  if (!accountId) return null;

  const account = accounts.find((acc) => acc.id === accountId);

  if (!account) return null;

  const accountTransactions = transactions.filter(
    (transaction) => transaction.accountId === accountId
  );

  return { account, accountTransactions };
}

const AccountDetails = ({
  loaderData,
}: {
  loaderData: {
    account: Account;
    accountTransactions: Transaction[];
  };
}) => {
  const { account, accountTransactions } = loaderData;

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <div className="w-full">
          <form
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 bg-white/80 rounded-lg p-4 shadow"
          >
            <div className="flex items-center col-span-2">
              <div
                className={`h-16 w-16 rounded-full bg-${account.iconBgColor}-100 flex items-center justify-center`}
              >
                <i
                  className={`${account.icon} text-${account.iconColor}-600 text-3xl`}
                ></i>
              </div>
              <div id="budget-title" className="ml-2 text-3xl">{account.name}</div>
            </div>
            <div className="col-span-3">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Name</Label>
                <Input
                  value={account.name}
                  onChange={(e) => {
                    const value = e.target.value;

                    // if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                    //   setFormDetails((prev) => ({
                    //     ...prev,
                    //     amount: value,
                    //   }));
                    // }
                  }}
                />
              </div>
            </div>
            <div className="col-span-3">
              {/* Type */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Type</Label>
                <Select value={account.type}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"credit"}>Credit</SelectItem>
                    <SelectItem value={"debit"}>Debit</SelectItem>
                    <SelectItem value={"savings"}>Savings</SelectItem>
                    <SelectItem value={"checking"}>Checking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="col-span-3">
              {/* Current Amount */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Current Amount</Label>
                <div className="relative rounded-md my-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                      {account.currency}
                    </span>
                  </div>
                  <Input
                    placeholder="0.00"
                    className="pl-12"
                    value={account.balance}
                    onChange={(e) => {
                      const value = e.target.value;

                      // if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                      //   setFormDetails((prev) => ({
                      //     ...prev,
                      //     amount: value,
                      //   }));
                      // }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-3">
              {/* Currency */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Currency</Label>
                <Select value={account.currency}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.name} ({currency.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="col-span-3 sm:col-span-1 md:col-span-1">
              {/* Icon */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Icon</Label>
                <Select value={account.icon}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {ICONS.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        <div className="w-4 h-4">
                          <i className={icon}></i>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="col-span-3 sm:col-span-1 md:col-span-1">
              {/* Icon Color */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Icon Color</Label>
                <Select value={account.iconColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select icon color" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className={`w-4 h-4 bg-${color}-600 border-1`} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="col-span-3 sm:col-span-1 md:col-span-1">
              {/* Icon Background Color */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Icon Background Color</Label>
                <Select value={account.iconColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select icon background color" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className={`w-4 h-4 bg-${color}-100 border-1`} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="col-span-3">
              <Label className="text-sm mr-4">Primary account:</Label>
              <div className="flex flex-row items-start space-x-3 rounded-md border p-4 col-span-9 mt-4">
                <Checkbox
                  checked={account.isPrimary}
                  onCheckedChange={(checked) => {}}
                />
                <div className="leading-none">
                  <p className="text-sm">Set this to primary account.</p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex flex-row items-center space-x-2">
                <NavLink to="/accounts">
                  <Button
                    variant="outline"
                    onClick={() => {}}
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Back
                  </Button>
                </NavLink>
                <Button
                  variant="default"
                  onClick={() => {}}
                  disabled
                >
                  <i className="ri-save-line mr-2"></i>
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="my-4 text-2xl">
          Transactions made with{" "}
          <span className="text-primary">{account.name}</span>
        </div>
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
            {accountTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <i className="ri-file-list-3-line text-4xl"></i>
                    <p>No transactions found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              accountTransactions?.map((transaction) => {
                const category = categories?.find(
                  (c) => c.id === transaction.categoryId
                );
                const account = accounts?.find(
                  (a) => a.id === transaction.accountId
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
                            } ${isIncome ? "text-green-600" : "text-blue-600"}`}
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

        {/* Pagination */}
        {accountTransactions && accountTransactions.length > 0 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">
                  {accountTransactions.length}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {accountTransactions.length}
                </span>{" "}
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
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
