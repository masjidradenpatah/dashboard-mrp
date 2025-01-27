"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLink = ({ link, text }: { link: string; text: string }) => {
  const pathname = usePathname();

  function isCurrentPath(): boolean {
    if (pathname === link) return pathname === link;
    if (pathname === "/" || link === "/") {
      return false;
    }
    return pathname.startsWith(link);
  }

  return (
    <Link
      href={link}
      className={`${isCurrentPath() ? "font-bold text-primary" : "transition duration-150 hover:text-primary/75"}`}
    >
      {text}
    </Link>
  );
};

export default NavLink;
