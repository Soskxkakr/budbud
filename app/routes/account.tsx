import { useState } from "react";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import AccountCard from "~/components/account/account-card";
import { formatCurrency } from "~/lib/utils";
import { accounts } from "~/data/dummy-data";
import type { Account } from "~/types/api";
import TransferForm from "~/components/account/transfer-form";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "~/components/ui/toast";

const Account = () => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  if (false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate total balance
  const totalBalance =
    accounts?.reduce((sum, account) => sum + Number(account.balance), 0) || 0;

  return (
    <div className="py-6">
      <Toast open={showToast} onOpenChange={setShowToast}>
        <ToastTitle>Account</ToastTitle>
        <ToastDescription>
          Manage your accounts and transactions here.
        </ToastDescription>
        <ToastClose />
      </Toast>
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
          {accounts?.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              showTransferModal={() => {
                setSelectedAccount(account);
                setShowTransferModal(true);
              }}
              showToast={() => setShowToast(true)}
            />
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

        <div>{JSON.stringify(selectedAccount)}</div>

        {selectedAccount && (
          <TransferForm
            isOpen={showTransferModal}
            onClose={() => {
              setShowTransferModal(false);
              setTimeout(() => {
                setSelectedAccount(null);
              }, 300);
            }}
            selectedAccount={selectedAccount}
          />
        )}
      </div>
    </div>
  );
};

export default Account;
