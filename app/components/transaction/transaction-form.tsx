import { useState } from "react";
// import { useToast } from '~/hooks/use-toast';
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import type { Account, Category } from "~/types/api";
import { useEffect } from "react";

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  categories: Category[];
}

export function TransactionForm({
  isOpen,
  onClose,
  accounts,
  categories,
}: TransactionFormProps) {
  // const { toast } = useToast();
  const [formDetails, setFormDetails] = useState<{
    accountId: string;
    description: string;
    amount: string;
    type: string;
    categoryId: string;
    date: { iso: string; time: string };
    remarks: string;
    isRecurring: boolean;
  }>({
    accountId: "",
    description: "",
    amount: "0",
    type: "",
    categoryId: "",
    date: {
      iso: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().slice(0, 5),
    },
    remarks: "",
    isRecurring: false,
  });

  useEffect(() => {
    if (isOpen) {
      setFormDetails({
        accountId: "",
        description: "",
        amount: "0",
        type: "",
        categoryId: "",
        date: {
          iso: new Date().toISOString().split("T")[0],
          time: new Date().toTimeString().slice(0, 5),
        },
        remarks: "",
        isRecurring: false,
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Select an account and enter the transaction details.
          </DialogDescription>
        </DialogHeader>

        {/* Account Selection at the top */}
        <div className="py-3 mb-2 border-b border-gray-200 bg-gray-50 -m-4 p-4 rounded-t-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            First, select an account:
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 mb-2">
            {accounts.map((account) => (
              <div
                key={account.id}
                onClick={() =>
                  setFormDetails((prev) => ({ ...prev, accountId: account.id }))
                }
                className={`p-2 border rounded-md cursor-pointer transition-colors flex items-center space-x-3 ${formDetails.accountId === account.id ? "border-primary" : "border-gray-200"}`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-md ${
                    account.type === "credit"
                      ? "bg-rose-500/10"
                      : "bg-primary/10"
                  } flex items-center justify-center`}
                >
                  <i
                    className={`${
                      account.type === "credit"
                        ? "ri-bank-card-line text-rose-500"
                        : "ri-wallet-3-line text-primary"
                    } text-lg`}
                  ></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {account.name}
                  </p>
                  <p className="text-sm text-gray-500 font-semibold">
                    ${account.balance.toLocaleString()}
                  </p>
                </div>
                {formDetails.accountId === account.id && (
                  <div className="flex-shrink-0">
                    <i className="ri-check-line text-primary text-lg"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              !!formDetails.accountId
                ? "max-h-[2000px] opacity-100 transform translate-y-0"
                : "max-h-0 opacity-0 transform -translate-y-4"
            }`}
          >
            <form onSubmit={() => {}} className="space-y-4 mx-1">
              <Label className={cn(false && "text-destructive")}>
                Description
              </Label>
              <Input className="mt-2" placeholder="E.g., Grocery shopping" />

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 mt-2">
                <div>
                  <Label className={cn(false && "text-destructive")}>
                    Amount
                  </Label>
                  <div className="relative rounded-md shadow-sm mt-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <Input
                      placeholder="0.00"
                      className="pl-7"
                      value={formDetails.amount}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                          setFormDetails((prev) => ({
                            ...prev,
                            amount: value,
                          }));
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label className={cn(false && "text-destructive")}>
                    Type
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setFormDetails((prev) => ({ ...prev, type: value }))
                    }
                    defaultValue={"expense"}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Label className={cn(false && "text-destructive")}>
                Category
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormDetails((prev) => ({ ...prev, categoryId: value }))
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label className={cn(false && "text-destructive")}>
                Date & Time
              </Label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 mt-2">
                <Input
                  type="date"
                  value={formDetails.date.iso}
                  className="cursor-pointer"
                  onChange={(e) =>
                    setFormDetails((prev) => ({
                      ...prev,
                      date: {
                        ...prev.date,
                        iso: new Date(e.target.value)
                          .toISOString()
                          .split("T")[0],
                      },
                    }))
                  }
                />
                <Input
                  type="time"
                  value={formDetails.date.time}
                  className="cursor-pointer"
                  onChange={(e) => {
                    const date = new Date();
                    const [hours, minutes] = e.target.value
                      .split(":")
                      .map(Number);
                    date.setHours(hours, minutes);
                    setFormDetails((prev) => ({
                      ...prev,
                      date: {
                        ...prev.date,
                        time: date.toTimeString().slice(0, 5),
                      },
                    }));
                  }}
                />
              </div>

              <div className="space-y-2 flex flex-row items-start space-x-3 rounded-md border p-4">
                <Checkbox checked={true} onCheckedChange={(checked) => {}} />
                <div className="space-y-1 leading-none">
                  <Label>Recurring transaction</Label>
                  <p className="text-sm text-muted-foreground">
                    Recurring transaction Mark this as a recurring transaction
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={false}>
                  Save Transaction
                </Button>
              </DialogFooter>
            </form>
          </div>

          {!formDetails.accountId && (
            <>
              {/* Guide text for when no account is selected */}
              <div className="text-center py-8 text-gray-500">
                <i className="ri-arrow-up-line text-3xl mb-2 animate-bounce"></i>
                <p>Please select an account to continue</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
