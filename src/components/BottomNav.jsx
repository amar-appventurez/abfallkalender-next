"use client";

import HomeIcon from "@/components/icons/HomeIcon";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MyBooking from "./icons/MyBooking";
import CategoriesIcon from "./icons/CategoriesIcon";

const BottomNav = () => {
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
  return <></>
  return (
    <div className="fixed bottom-0 p-[10px] w-full">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label={"Home"}
          icon={<HomeIcon color={value === 0 ? "#014899" : "#CDCDD6"} />}
          classes={{
            root: "text-text-inactive",
            selected: "text-primary",
          }}
          component={Link}
          href="/home"
        />
        <BottomNavigationAction
          label={"Services"}
          icon={<CategoriesIcon color={value === 1 ? "#014899" : "#CDCDD6"} />}
          classes={{
            root: "text-text-inactive",
            selected: "text-primary",
          }}
          component={Link}
          href="/services"
        />
        <BottomNavigationAction
          label={"My Booking"}
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
