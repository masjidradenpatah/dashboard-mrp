import React from "react";
import NavLink from "@/components/NavLink";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
const MobileNavbar = ({
  isNavbarOpen,
  isLoggedIn,
}: {
  isNavbarOpen: boolean;
  isLoggedIn: boolean;
  username?: string;
}) => {
  return (
    <div
      className={`${isNavbarOpen ? "absolute" : "hidden"} top-0 flex h-dvh w-full flex-col gap-4 border-l-2 border-secondary bg-background px-8 pt-28 transition-all duration-200 lg:relative lg:right-[unset] lg:h-full lg:w-fit lg:flex-row lg:gap-4 lg:border-0 lg:p-0`}
    >
      <div className={"flex size-full flex-col gap-4"}>
        <NavLink link={"/"} text={"Home"} />
        <NavLink link={"/programs"} text={"Program"} />
        <NavLink link={"/services"} text={"Layanan"} />
        {/*<NavLink link={"/article"} text={"Artikel"} />*/}
        <NavLink link={"/contact"} text={"Kontak"} />
        {isLoggedIn ? (
          // <SignOutButton />
          <>
            <Button
              variant={"outline"}
              className={"border-2 border-primary text-primary"}
              asChild={true}
            >
              <Link href={"/dashboard"} className={""}>
                Dashboard
              </Link>
            </Button>
            <SignOutButton className={"w-full"} />
          </>
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
    </div>
  );
};
export default MobileNavbar;
