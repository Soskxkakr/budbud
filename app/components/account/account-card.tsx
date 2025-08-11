import { NavLink } from "react-router";
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
import type { Account } from "~/types/api";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

const AccountCard = ({
  account,
  showTransferModal,
  showToast,
}: {
  account: Account;
  showTransferModal: () => void;
  showToast: () => void;
}) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`h-8 w-8 rounded-full bg-${account.iconBgColor}-100 text-${account.iconColor}-600 flex items-center justify-center`}
            >
              <i className={`${account.icon}`}></i>
            </div>
            <CardTitle>{account.name}</CardTitle>
            {account.isPrimary && (
              <Badge className="text-xs ml-2 mt-1 font-medium hover:cursor-default">Primary</Badge>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-primary bordcer-transparent border-1 border-transparent h-10 w-10">
                <i className="ri-more-2-fill"></i>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <NavLink to={`/accounts/${account.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  Edit
                </DropdownMenuItem>
              </NavLink>
              {!account.isPrimary && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    Set as primary
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-500 focus:text-red-700 focus:bg-red-200"
                onClick={showToast}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <Button variant="outline" size="sm" onClick={showTransferModal}>
          <i className="ri-exchange-line mr-2"></i>
          Transfer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
