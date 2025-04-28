import { NavLink, useLocation } from "react-router";
import { cn } from "~/lib/utils";

interface SidebarLink {
  href: string;
  icon: string;
  label: string;
}

const links: SidebarLink[] = [
  { href: "/", icon: "ri-dashboard-line", label: "Dashboard" },
  { href: "/accounts", icon: "ri-wallet-3-line", label: "Accounts" },
  {
    href: "/transactions",
    icon: "ri-exchange-dollar-line",
    label: "Transactions",
  },
  { href: "/budgets", icon: "ri-pie-chart-line", label: "Budgets" },
  { href: "/analytics", icon: "ri-line-chart-line", label: "Analytics" },
  { href: "/settings", icon: "ri-settings-3-line", label: "Settings" },
];

const Sidebar = () => {
  const location = useLocation().pathname;

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <i className="ri-coin-line text-white"></i>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Budget Buddy
            </h1>
          </div>
        </div>
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            {links.map((link) => (
              <NavLink key={link.href} to={link.href}>
                <div
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer",
                    location === link.href
                      ? "text-white bg-primary"
                      : "text-gray-600 hover:bg-secondary hover:text-primary"
                  )}
                >
                  <i
                    className={cn(
                      link.icon,
                      "mr-3",
                      location === link.href ? "text-white" : "text-gray-400"
                    )}
                  ></i>
                  {link.label}
                </div>
              </NavLink>
            ))}
          </nav>
          <div className="p-4">
            <div className="p-3 bg-secondary rounded-lg">
              <h3 className="text-sm font-medium text-gray-700">
                Premium Plan
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Upgrade for advanced analytics and unlimited budgets.
              </p>
              <button className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-info hover:bg-info focus:outline-none">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div>
              <div className="h-9 w-9 rounded-full bg-primary-light text-white flex items-center justify-center">
                <span className="text-sm font-medium">JS</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Smith</p>
              <p className="text-xs font-medium text-gray-500">
                john@example.com
              </p>
            </div>
            <button className="ml-auto text-gray-400 hover:text-gray-500">
              <i className="ri-logout-box-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
