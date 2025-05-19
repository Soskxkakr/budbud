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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

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
  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return "ri-bank-line";
      case "savings":
        return "ri-safe-2-line";
      case "credit":
        return "ri-bank-card-line";
      case "cash":
        return "ri-money-dollar-box-line";
      default:
        return "ri-wallet-3-line";
    }
  };

  const getAccountColorClass = (type: string) => {
    switch (type) {
      case "checking":
        return "bg-blue-100 text-blue-600";
      case "savings":
        return "bg-green-100 text-green-600";
      case "credit":
        return "bg-purple-100 text-purple-600";
      case "cash":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const { account, accountTransactions } = loaderData;

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        <div className="flex items-center space-x-2">
          <div
            className={`h-16 w-16 rounded-full ${getAccountColorClass(
              account.type
            )} flex items-center justify-center`}
          >
            <i className={`${getAccountIcon(account.type)} text-3xl`}></i>
          </div>
          <div className="ml-2 text-3xl">{account.name}</div>
        </div>
        <form className="md:grid md:grid-cols-8 lg:grid-cols-10 mt-4 px-4 border-1 items-center">
          <Label className="text-sm mr-4">Name:</Label>
          <Input
            className="col-span-9 mb-2 mt-4"
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

          <Label className="text-sm mr-4">Type:</Label>
          <Select
            value={account.type}
            // onValueChange={(value) => {
            //   setFormDetails((prevState) => ({
            //     ...prevState,
            //     accountId: value,
            //   }));
            // }}
          >
            <SelectTrigger className="mt-2 mb-2 col-span-9">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"credit"}>Credit</SelectItem>
              <SelectItem value={"debit"}>Debit</SelectItem>
              <SelectItem value={"savings"}>Savings</SelectItem>
            </SelectContent>
          </Select>

          <Label className="text-sm mr-4">Current Amount:</Label>
          <div className="relative rounded-md my-2 col-span-9">
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

          <Label className="text-sm mr-4">Currency:</Label>
          <Select
            value={account.currency}
            // onValueChange={(value) => {
            //   setFormDetails((prevState) => ({
            //     ...prevState,
            //     accountId: value,
            //   }));
            // }}
          >
            <SelectTrigger className="mt-2 col-span-9">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"MYR"}>Malaysian Ringgit (MYR)</SelectItem>
            </SelectContent>
          </Select>

          <Label className="text-sm mr-4">Customization:</Label>
          <Label className="text-sm mr-4">Icon:</Label>
          <div className="flex flex-row flex-wrap md:flex-nowrap items-center space-x-4 space-y-2 md:space-y-0 col-span-2 mt-4">
            <RadioGroup className="flex flex-row flex-wrap gap-2">
              <Label className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="ri-bank-line" />
                <div className="w-4 h-4">
                  <i className="ri-bank-line"></i>
                </div>
                <RadioGroupItem value="ri-safe-2-line" />
                <div className="w-4 h-4">
                  <i className="ri-safe-2-line"></i>
                </div>
                <RadioGroupItem value="ri-bank-card-line" />
                <div className="w-4 h-4">
                  <i className="ri-bank-card-line"></i>
                </div>
                <RadioGroupItem value="ri-money-dollar-box-line" />
                <div className="w-4 h-4">
                  <i className="ri-money-dollar-box-line"></i>
                </div>
              </Label>
            </RadioGroup>
          </div>

          <Label className="text-sm mr-4">Icon Color:</Label>
          <div className="flex flex-row flex-wrap md:flex-nowrap items-center space-x-4 space-y-2 md:space-y-0 col-span-2 mt-4">
            <RadioGroup className="flex flex-row flex-wrap gap-2">
              <Label className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="bg-green-600" />
                <div className="w-4 h-4 bg-green-600 border-1"></div>
                <RadioGroupItem value="bg-blue-600" />
                <div className="w-4 h-4 bg-blue-600 border-1"></div>
                <RadioGroupItem value="bg-purple-600" />
                <div className="w-4 h-4 bg-purple-600 border-1"></div>
                <RadioGroupItem value="bg-yellow-600" />
                <div className="w-4 h-4 bg-yellow-600 border-1"></div>
              </Label>
              <Label className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="bg-red-600" />
                <div className="w-4 h-4 bg-red-600 border-1"></div>
                <RadioGroupItem value="bg-pink-600" />
                <div className="w-4 h-4 bg-pink-600 border-1"></div>
                <RadioGroupItem value="bg-indigo-600" />
                <div className="w-4 h-4 bg-indigo-600 border-1"></div>
                <RadioGroupItem value="bg-yellow-600" />
                <div className="w-4 h-4 bg-gray-600 border-1"></div>
              </Label>
            </RadioGroup>
          </div>

          <Label className="text-sm mr-4">Background Color:</Label>
          <div className="flex flex-row flex-wrap md:flex-nowrap items-center space-x-4 space-y-2 md:space-y-0 col-span-2 mt-4">
            <RadioGroup className="flex flex-row flex-wrap gap-2">
              <Label className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="bg-green-100" />
                <div className="w-4 h-4 bg-green-100 border-1"></div>
                <RadioGroupItem value="bg-blue-100" />
                <div className="w-4 h-4 bg-blue-100 border-1"></div>
                <RadioGroupItem value="bg-purple-100" />
                <div className="w-4 h-4 bg-purple-100 border-1"></div>
                <RadioGroupItem value="bg-yellow-100" />
                <div className="w-4 h-4 bg-yellow-100 border-1"></div>
              </Label>
              <Label className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="bg-red-100" />
                <div className="w-4 h-4 bg-red-100 border-1"></div>
                <RadioGroupItem value="bg-pink-100" />
                <div className="w-4 h-4 bg-pink-100 border-1"></div>
                <RadioGroupItem value="bg-indigo-100" />
                <div className="w-4 h-4 bg-indigo-100 border-1"></div>
                <RadioGroupItem value="bg-yellow-100" />
                <div className="w-4 h-4 bg-gray-100 border-1"></div>
              </Label>
            </RadioGroup>
            {/* <input
              type="color"
              value={"#000000"}
              className="w-10 h-10 border rounded"
              onChange={() => {}}
              disabled
            /> */}
          </div>

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

          <NavLink to="/accounts">
            <Button
              className="m-4 ml-0 w-full"
              variant="outline"
              size="sm"
              onClick={() => {}}
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back
            </Button>
          </NavLink>
          <Button
            className="m-4 w-full"
            variant="default"
            size="sm"
            onClick={() => {}}
            disabled
          >
            <i className="ri-save-line mr-2"></i>
            Save
          </Button>
        </form>
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
