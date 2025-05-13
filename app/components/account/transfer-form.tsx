import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { accounts } from "~/data/dummy-data";
import { cn } from "~/lib/utils";
import type { Account } from "~/types/api";

interface TransferFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAccount: Account;
}

const TransferForm = ({
  isOpen,
  onClose,
  selectedAccount,
}: TransferFormProps) => {
  const [formDetails, setFormDetails] = useState({
    accountId: "",
    amount: "",
    remarks: "",
  });

  const filteredAccounts = accounts.filter(
    (account) => account.id !== selectedAccount.id
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Transfer</DialogTitle>
          <DialogDescription>
            Select an account and enter the transaction details.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <form onSubmit={() => {}} className="space-y-4 mx-2">
            <Label className={cn(false && "text-destructive")}>From</Label>
            <div
              className={`p-2 border rounded-md transition-colors flex items-center space-x-3`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-md ${
                  selectedAccount.type === "credit"
                    ? "bg-rose-500/10"
                    : "bg-primary/10"
                } flex items-center justify-center`}
              >
                <i
                  className={`${
                    selectedAccount.type === "credit"
                      ? "ri-bank-card-line text-rose-500"
                      : "ri-wallet-3-line text-primary"
                  } text-lg`}
                ></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {selectedAccount.name}
                </p>
                <p className="text-sm text-gray-500 font-semibold">
                  ${selectedAccount.balance.toLocaleString()}
                </p>
              </div>
            </div>
            {/* <MoveRight className="h-4 w-4" /> */}
            <Label className={cn(false && "text-destructive")}>To</Label>
            <Select
              onValueChange={(value) => {
                setFormDetails((prevState) => ({
                  ...prevState,
                  accountId: value,
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {filteredAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                !!formDetails.accountId
                  ? "max-h-[2000px] opacity-100 transform translate-y-0"
                  : "max-h-0 opacity-0 transform -translate-y-4"
              }`}
            >
              <Label className={cn(false && "text-destructive")}>Amount</Label>
              <div className="relative rounded-md shadow-sm mt-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <Input
                  placeholder="0.00"
                  className="pl-7"
                  value={"0"}
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

              <Label className={cn(false && "text-destructive")}>Remarks</Label>
              <Input
                placeholder="Enter remarks"
                className="mt-2"
                value={formDetails.remarks}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormDetails((prev) => ({
                    ...prev,
                    remarks: value,
                  }));
                }}
              />
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
      </DialogContent>
    </Dialog>
  );
};

export default TransferForm;
