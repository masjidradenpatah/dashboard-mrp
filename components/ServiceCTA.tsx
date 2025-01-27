import React from "react";
import { CircleIcon } from "@/components/decorations/Icons";
import { CircleHelp, Phone } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ServiceCta = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        "container flex w-full flex-col gap-12 rounded-3xl bg-white/35 p-4 text-center font-medium md:p-16",
        className,
      )}
    >
      <span className={"block w-full text-2xl md:text-4xl"}>
        Ingin ikut layanan{" "}
        <span className={"relative text-nowrap font-bold text-primary"}>
          Masjid Raden Patah
          <CircleIcon
            className={
              "absolute right-0 top-0 translate-x-full rotate-12 max-sm:-translate-y-1/2 md:-right-8 md:scale-150"
            }
          >
            {<CircleHelp />}
          </CircleIcon>
        </span>
      </span>
      <div className={"flex w-full items-center justify-center gap-4"}>
        <Link href={"https://wa.me/628993117777"}>
          <div
            className={
              "size-16 rounded-2xl bg-gradient-to-bl from-primary/0 via-primary/40 via-75% to-primary/60 p-4 md:size-24"
            }
          >
            <Phone className={"size-full fill-primary text-white/0"}></Phone>
          </div>
        </Link>
        <div
          className={"flex flex-col justify-center text-start md:items-center"}
        >
          <p className={"w-full text-start text-xl"}>Hubungi kami di:</p>
          <Link href={"https://wa.me/628993117777"}>
            <p className={"w-full text-start text-xl font-bold md:text-3xl"}>
              Call Center
            </p>
            <p className={"w-full text-start text-xl font-medium text-primary"}>
              0899 311 7777
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default ServiceCta;
