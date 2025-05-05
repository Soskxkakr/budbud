import { NavLink } from "react-router";

const UserNav = () => {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 md:hidden">
      <div className="flex-1 flex justify-center px-4">
        <div className="flex items-center">
          <NavLink to="/">
            <div className="flex items-center cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <i className="ri-coin-line text-white text-xl"></i>
              </div>
              <h1 className="ml-2 text-xl font-logo tracking-wide text-gray-800">
                Budget Buddy
              </h1>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
