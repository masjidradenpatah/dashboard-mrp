import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

const SectionTitle = ({ title, subtitle, className }: SectionTitleProps) => {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col rounded-xl bg-gradient-to-tr from-[#ACD3DB] to-primary px-4 py-2 text-white",
        className,
      )}
    >
      <h2
        className={
          "text-center text-2xl font-semibold tracking-wide lg:text-3xl"
        }
      >
        {title}
      </h2>
      <p className={"text-center text-lg lg:text-xl"}>{subtitle}</p>
    </div>
  );
};
export default SectionTitle;
