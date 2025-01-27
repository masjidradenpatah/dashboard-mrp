import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { House } from "lucide-react";
import Image from "next/image";

import sidePhoto from "@/public/profile.png";
import NavLink from "@/components/NavLink";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/*  The real page content Here */}
      <div className={"flex w-full justify-center"}>
        <div className={"flex w-[460px] flex-col gap-6 lg:justify-between"}>
          <div className={"flex items-center justify-between"}>
            <Button className={"aspect-square size-fit p-4"} asChild>
              <Link href={"/"}>
                <House className={"text-xl text-white"} />
              </Link>
            </Button>
            <div className={"space-x-4"}>
              <NavLink link={"/signIn"} text={"Sign In"} />
              <NavLink link={"/signUp"} text={"Sign Up"} />
            </div>
          </div>
          {children}
        </div>
        {/*  */}
      </div>
      <Image
        src={sidePhoto}
        width={450}
        className={
          "relative hidden max-h-[550px] rounded-2xl object-center lg:block xl:max-h-[650px] xl:-translate-x-12 2xl:-translate-x-20"
        }
        alt={"Masjid raden patah"}
      />
    </>
  );
};
export default Layout;
