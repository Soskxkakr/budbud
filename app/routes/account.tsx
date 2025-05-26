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
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "~/components/ui/toast";
import { NavLink } from "react-router";

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
          <div className="mt-4 sm:mt-0">
            <Button asChild>
              <NavLink to="/accounts/new">
                <i className="ri-add-line mr-2"></i>
                Create New Account
              </NavLink>
            </Button>
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
        </div>

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
