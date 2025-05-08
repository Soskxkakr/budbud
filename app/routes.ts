import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/dashboard.tsx"),
  ...prefix("accounts", [
    index("routes/account/index.tsx"),
    route(":accountId", "routes/account/details.tsx"),
  ]),
  // route("/accounts", "routes/account/index.tsx"),
  // route("/accounts/:accountId", "routes/account/details.tsx"),
  route("/transactions", "routes/transaction.tsx"),
  route("/budgets", "routes/budget.tsx"),
  route("/analytics", "routes/analytic.tsx"),
  route("/settings", "routes/setting.tsx"),
] satisfies RouteConfig;
