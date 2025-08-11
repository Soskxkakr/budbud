import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/dashboard.tsx"),
  route("/signin", "routes/signin.tsx"),
  route("/signup", "routes/signup.tsx"),
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
  route("/webhooks", "routes/webhooks.tsx"),
] satisfies RouteConfig;
