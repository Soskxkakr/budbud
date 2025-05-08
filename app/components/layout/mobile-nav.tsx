import { NavLink, useLocation } from "react-router";
import { cn } from "~/lib/utils";

interface NavLink {
  href: string;
  icon: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", icon: "ri-dashboard-line", label: "Dashboard" },
  { href: "/accounts", icon: "ri-wallet-3-line", label: "Accounts" },
  {
    href: "/transactions",
    icon: "ri-exchange-dollar-line",
    label: "Transactions",
  },
  { href: "/budgets", icon: "ri-pie-chart-line", label: "Budgets" },
  { href: "/settings", icon: "ri-user-line", label: "Profile" },
];

const MobileNav = () => {
  const location = useLocation().pathname.split("/")[1];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-10 shadow-md">
      <div className="grid grid-cols-5 gap-1 px-1 py-1">
        {navLinks.map((link) => {
          const linkRoot = link.href.replace("/", "");

          return (
            <NavLink key={link.href} to={link.href}>
              <div
                className={cn(
                  "flex flex-col items-center justify-center p-2 cursor-pointer rounded-lg",
                  location === linkRoot
                    ? "text-primary bg-primary-light/20 font-semibold"
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                <i className={`${link.icon} text-2xl`}></i>
                {/* <span className="text-xs mt-1 font-medium">{link.label}</span> */}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
