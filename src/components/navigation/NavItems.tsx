"use client";

import React from "react";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Home",
    href: ROUTES.HOME,
  },
  {
    name: "Companions",
    href: ROUTES.COMPANIONS,
  },
  {
    name: "My Journey",
    href: ROUTES.MY_JOURNEY,
  },
  {
    name: "Subscription",
    href: ROUTES.SUBSCRIPTION,
  },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className={cn("", pathname === href && "text-primary font-semibold")}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
