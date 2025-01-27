"use client";
import React, { useState } from "react";
import Image from "next/image";
import mrplogo from "@/public/mrp-logo.png";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

import MenuToggle from "@/components/MenuToggle";
import MobileNavbar from "@/components/MobileNavbar";
import NavLink from "@/components/NavLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "@/components/SignOutButton";

const Navbar = ({
  isLoggedIn,
  username,
}: {
  isLoggedIn: boolean;
  username?: string;
}) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  return (
    <header className={"fixed inset-x-0 z-40 bg-white/50 backdrop-blur-2xl"}>
      <nav
        className={
          "container mt-2 flex w-full items-center justify-between p-4 px-2"
        }
      >
        <div>
          <Image height={82} src={mrplogo} alt={"Logo Masjid Raden Patah"} />
        </div>
        <div className={"hidden gap-4 md:flex lg:gap-8"}>
          <NavLink link={"/"} text={"Home"} />
          <NavLink link={"/programs"} text={"Program"} />
          <NavLink link={"/services"} text={"Layanan"} />
          {/*<NavLink link={"/article"} text={"Artikel"} />*/}
          <NavLink link={"/contact"} text={"Kontak"} />
        </div>
        <div className={"hidden gap-4 md:flex"}>
          {isLoggedIn ? (
            // <SignOutButton />
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({ variant: "outline" })}
              >
                <p className={"p-2"}>{username?.split(" ")[0]}</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className={"mt-2 flex w-full p-0"}>
                  <SignOutButton className={"w-full"} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant={"outline"}
                className={"border-2 border-primary text-primary"}
                asChild={true}
              >
                <Link href={"/signIn"}>Sign In</Link>
              </Button>
              <Button asChild={true}>
                <Link href={"/signUp"}>Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <MenuToggle
          value={isNavbarOpen}
          onChange={() => setIsNavbarOpen((prev) => !prev)}
        />
        <div className="absolute top-0 size-full md:hidden">
          <MobileNavbar
            isLoggedIn={isLoggedIn}
            username={username}
            isNavbarOpen={isNavbarOpen}
          />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
