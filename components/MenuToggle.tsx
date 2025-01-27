import React from "react";
import { cn } from "@/lib/utils";

interface MenuToggleProps {
  className?: string;
  value: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const MenuToggle = ({ className, value, onChange }: MenuToggleProps) => {
  return (
    <label
      htmlFor="menu"
      className={cn(
        "relative z-10 flex size-16 scale-75 flex-col" +
          " items-center justify-center gap-2 md:hidden",
        className,
      )}
    >
      <input
        type="checkbox"
        className="peer/menu sr-only"
        id="menu"
        onChange={onChange}
        checked={value}
      />
      <div
        className={`bars_element top-1/4 duration-100 peer-checked/menu:top-1/2 peer-checked/menu:opacity-0`}
      />
      <div
        className={`bars_element top-3/4 duration-100 peer-checked/menu:top-1/2 peer-checked/menu:opacity-0`}
      />
      <div
        className={`bars_element top-1/2 opacity-0 delay-100 duration-200 peer-checked/menu:rotate-45 peer-checked/menu:opacity-100`}
      />
      <div
        className={`bars_element top-1/2 delay-100 duration-200 peer-checked/menu:-rotate-45`}
      />
    </label>
  );
};
export default MenuToggle;
