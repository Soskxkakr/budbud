import Sidebar from "~/components/layout/sidebar";
import UserNav from "~/components/layout/user-nav";
import MobileNav from "~/components/layout/mobile-nav";
import { ToastProvider, ToastViewport } from "~/components/ui/toast";
import { useIsMobile } from "~/hooks/use-mobile";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  // Set mobile padding to account for bottom navigation
  const mobilePaddingClass = isMobile ? "pb-16" : "";

  return (
    <div className="flex h-screen overflow-hidden bg-secondary-light">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation Bar (Mobile only) */}
        <UserNav />

        {/* Main Content Container */}
        <main
          className={`flex-1 relative overflow-y-auto focus:outline-none ${mobilePaddingClass}`}
        >
          <ToastProvider>
            <ToastViewport />
            {children}
          </ToastProvider>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};

export default AppLayout;
