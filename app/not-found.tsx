import React from "react";
import Image from "next/image";
import background from "@/public/deocrations/background.png";
import mrp from "@/public/logo-mrp-big.png";
import { ServerCrash } from "lucide-react";

const NotFound = () => {
  return (
    <div
      className={
        "relative size-full h-screen overflow-hidden bg-gradient-to-br from-[#DCF2F2] via-[#C6EAED] via-[62%]" +
        " to-[#1EAAC8] to-[130%]"
      }
    >
      <Image
        src={background}
        alt={"background"}
        className={
          "absolute right-0 top-0 hidden translate-x-[20%] translate-y-[-20%] scale-75 lg:block lg:scale-100"
        }
      />
      <section className="container flex size-full flex-col items-center justify-center lg:flex-row">
        <div className="space-y-4 text-center lg:w-full lg:text-start">
          <p
            className={"text-4xl font-medium text-muted-foreground lg:text-6xl"}
          >
            404 <ServerCrash className={"inline h-auto w-8 lg:w-16"} />{" "}
          </p>
          <p className={"text-4xl font-medium text-primary lg:text-6xl"}>
            Page not found
          </p>
        </div>
        <div className="max-lg:order-first lg:w-full">
          <Image
            src={mrp}
            className={
              "ms-auto h-auto w-[100px] max-lg:mb-12 sm:w-[200px] lg:w-[400px]"
            }
            alt={"mrp logo"}
          ></Image>
        </div>
      </section>
    </div>
  );
};
export default NotFound;
