import type { Account } from "~/types/api";
import type { Route } from "./+types";
import { accounts } from "~/data/dummy-data";

export async function loader({ params }: Route.LoaderArgs) {
  const { accountId } = params;
  const account = accounts.find((acc) => acc.id === accountId);

  if (!account) {
    throw new Response("Account not found", { status: 404 });
  }

  return { account };
}

const AccountDetails = ({
  loaderData,
}: {
  loaderData: { account: Account };
}) => {
  const account = loaderData.account as Account;

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{account.name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
