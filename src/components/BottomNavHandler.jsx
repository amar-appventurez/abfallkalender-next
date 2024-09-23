"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav"; 

export default function BottomNavHandler() {
  const [hideBottomNav, setHideBottomNav] = useState(null);
  const pathname = usePathname(); 

  // Define routes to explicitly show or hide the BottomNav
  const showBottomNavRoutes = ['/home', '/services','/bookings',"/booking-details"];
  const hideBottomNavRoutes = ['/service-details','/book-service'];

  // Function to handle BottomNav visibility based on current route
  const handleRouteChange = (pathname) => {
    const mustShowBottomNav = showBottomNavRoutes.includes(pathname);
    const mustHideBottomNav = hideBottomNavRoutes.includes(pathname);

    if (mustHideBottomNav) {
      setHideBottomNav(true); // Hide BottomNav for specific routes
    } else if (mustShowBottomNav) {
      setHideBottomNav(false); // Show BottomNav for specific routes
    } else {
      // For other routes, leave the BottomNav state as it is
      setHideBottomNav(hideBottomNav);
    }
  };

  useEffect(() => {
    handleRouteChange(pathname);
  }, [pathname]);

  return !hideBottomNav ? <BottomNav /> : null;
}
