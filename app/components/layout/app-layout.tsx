import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Sidebar from "./sidebar";
import UserNav from "./user-nav";
import MobileNav from "./mobile-nav";
import AuthLayout from "./auth-layout";
import { ToastProvider, ToastViewport } from "~/components/ui/toast";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // TODO: Replace with actual auth state management
  const [userData, setUserData] = useState(null);
  
  // Authentication routes that don't require navigation
  const authRoutes = ["/signin", "/signup"];
  const isAuthRoute = authRoutes.includes(location.pathname);
  
  // Redirect logic
  useEffect(() => {
    if (!userData && !isAuthRoute) {
      // User not authenticated and trying to access protected route
      // navigate("/signin");
    } else if (userData && isAuthRoute) {
      // User authenticated but on auth route, redirect to dashboard
      // navigate("/");
    }
  }, [userData, isAuthRoute, navigate]);
  
  // If user is not authenticated, show auth layout
  if (!userData) {
    return <AuthLayout>{children}</AuthLayout>;
  }
  
  // If user is authenticated, show full layout with navigation
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <UserNav />
        <MobileNav />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <ToastProvider>
            <ToastViewport />
            <div className="mx-4 mt-4 p-4 text-center bg-blue-300 text-blue-600 font-medium rounded-lg sticky top-4 z-50">
              <i className="ri-information-line mr-2"></i>
              You are in development server. Data provided are for testing purposes and will be purged in the next 24 hours.
            </div>
            {children}
          </ToastProvider>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
