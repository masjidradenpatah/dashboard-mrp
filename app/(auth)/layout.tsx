import React, { ReactNode } from "react";
import Image from "next/image";
import authBackground from "@/public/auth-background.png";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div
        className={
          "relative size-full overflow-hidden bg-gradient-to-r from-white from-[-15%] to-primary to-[150%]"
        }
      >
        <Image
          src={authBackground}
          alt={""}
          className={
            "pointer-events-none absolute right-0 top-0 hidden -translate-y-48 translate-x-1/4 md:block"
          }
        />
        <div
          className={
            "flex size-full h-screen flex-col items-center justify-center"
          }
        >
          <section
            className={
              "container relative z-10 flex size-full h-full min-h-48 gap-12 rounded-3xl p-4 max-sm:py-12 md:h-fit md:border-8 md:border-white" +
              " md:bg-white/35 md:p-12 md:shadow md:backdrop-blur-[100px] lg:gap-6"
            }
          >
            {/*  The real page content Here */}
            {children}
          </section>
        </div>
      </div>
    </>
  );
};
export default AuthLayout;
