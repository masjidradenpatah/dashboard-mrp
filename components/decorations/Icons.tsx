import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const CircleIcon = ({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) => {
  return (
    <div className={cn("relative size-fit rounded-full shadow", className)}>
      <div
        className={
          "relative size-fit rounded-full bg-white p-2 shadow-[inset_0px_3px_3px_0px_rgba(0,0,0,0.25)]"
        }
      >
        <div
          className={cn(
            "relative rounded-full bg-gradient-to-r from-primary via-[#58E9F4] to-primary p-2 text-white",
            innerClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
