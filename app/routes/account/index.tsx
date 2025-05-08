import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { formatCurrency } from "~/lib/utils";
import { useState } from "react";
import { accounts } from "~/data/dummy-data";
import type { Account } from "~/types/api";
import { NavLink } from "react-router";

function AccountCard({ account }: { account: Account }) {
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

  return (
    <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`h-8 w-8 rounded-full ${getAccountColorClass(
                account.type
              )} flex items-center justify-center`}
            >
              <i className={getAccountIcon(account.type)}></i>
            </div>
            <CardTitle>{account.name}</CardTitle>
            {account.isPrimary && <Badge>Primary</Badge>}
          </div>
          <Button variant="ghost" size="icon">
            <i className="ri-more-2-fill"></i>
          </Button>
        </div>
        <CardDescription className="capitalize">
          {account.type} Account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatCurrency(account.balance, account.currency)}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <NavLink to={`./${account.id}`}>
          <Button variant="outline" size="sm">
            <i className="ri-eye-line mr-2"></i>
            View
          </Button>
        </NavLink>
        <Button variant="outline" size="sm">
          <i className="ri-exchange-line mr-2"></i>
          Transfer
        </Button>
      </CardFooter>
    </Card>
  );
}

const Account = () => {
  const [accountsData, setAccountsData] = useState<Account[]>(accounts);

  if (false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate total balance
  const totalBalance =
    accountsData?.reduce((sum, account) => sum + Number(account.balance), 0) ||
    0;

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Accounts</h2>
            <p className="mt-1 text-sm text-gray-500">
              Total Balance:{" "}
              <span className="font-medium">
                {formatCurrency(totalBalance)}
              </span>
            </p>
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountsData?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}

          {/* Add Account Card */}
          <Card className="border-dashed border-2 flex flex-col items-center justify-center text-center p-6 h-full min-h-[200px] hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <i className="ri-add-line text-gray-500 text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Add New Account
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Track your bank accounts, credit cards, and more
            </p>
            <Button variant="outline">Get Started</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
