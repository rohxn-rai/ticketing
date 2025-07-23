"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavHeader = ({ currentUser }) => {
  const pathname = usePathname();

  const links = currentUser
    ? [{ label: "sign out", href: "/signout" }]
    : [
        { label: "sign Up", href: "/signup" },
        { label: "sign In", href: "/signin" },
      ];

  return (
    <nav className="flex gap-8 py-1">
      {links.map((link, index) => {
        return (
          <Link
            href={link.href}
            key={index}
            className={`${
              link.href === pathname && "border-b-2 border-foreground"
            } capitalize`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavHeader;
