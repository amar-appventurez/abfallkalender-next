"use client";

import HomeIcon from "../components/icons/HomeIcon";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MyBooking from "./icons/MyBooking";
import CategoriesIcon from "./icons/CategoriesIcon";

const BottomNav = () => {
  const bottomNavTranslate=useTranslations('BottomNavigation')
  const [value, setValue] = useState(null);
  const path = usePathname();
//   const t = useTranslations('BottomNavigation');

  const getValueFromPath = (path) => {
    if (path === '/home') return 0;
    if (path === '/services') return 1;
    if (path === '/bookings') return 2;
    return 0;
  };

  useEffect(() => {
    if (path) {
      setValue(getValueFromPath(path));
    }
  }, [path])
  
  return (
    <div className="fixed bottom-0 rounded-stepper-border-nav-radius w-[100%] border-stepper-bottom-nav-border border-border-color-1">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          pb: 1
        }}
      >
        <BottomNavigationAction
          label={bottomNavTranslate('home')}
          icon={<HomeIcon color={value === 0 ? "#014899" : "#CDCDD6"} />}
          classes={{
            root: "text-text-inactive",
            selected: "text-primary",
          }}
          component={Link}
          href="/home"
        />
        <BottomNavigationAction
          label={bottomNavTranslate('services')}
          icon={<CategoriesIcon color={value === 1 ? "#014899" : "#CDCDD6"} />}
          classes={{
            root: "text-text-inactive",
            selected: "text-primary",
          }}
          component={Link}
          href="/services"
        />
        <BottomNavigationAction
          label={bottomNavTranslate('booking')}
          icon={<MyBooking color={value === 2 ? "#014899" : "#CDCDD6"} />}
          classes={{
            root: "text-text-inactive",
            selected: "text-primary",
          }}
          component={Link}
          href="/bookings"
        />
      </BottomNavigation>
    </div>
  );
};

export default BottomNav;
