import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/dashboard.tsx"),
  ...prefix("accounts", [
    index("routes/account.tsx"),
    route("/:accountId", "routes/account-details.tsx"),
  ]),
  route("/transactions", "routes/transaction.tsx"),
  ...prefix("budgets", [
    index("routes/budget.tsx"),
    route(":budgetId", "routes/budget-details.tsx"),
    route("new", "routes/budget-new.tsx"),
  ]),
  route("/analytics", "routes/analytic.tsx"),
  route("/settings", "routes/setting.tsx"),
] satisfies RouteConfig;
