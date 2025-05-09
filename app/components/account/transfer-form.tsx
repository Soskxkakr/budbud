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
import type { Account } from "~/types/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TransferFormProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
}

const TransferForm = ({ isOpen, onClose, accounts }: TransferFormProps) => {
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
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden`}
          >
            <form onSubmit={() => {}} className="space-y-4 mx-1">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4 mt-2 items-center">
                <p>From Wallet</p>
                <MoveRight className="h-4 w-4" />
                <Select onValueChange={(value) => {}}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bank Account">Bank Account</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransferForm;
