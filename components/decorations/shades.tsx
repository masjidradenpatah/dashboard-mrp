import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import bgSingleImg from "@/public/deocrations/Bg-Single.png";
import bgDoubleImg from "@/public/deocrations/Bg-Double.png";
import bgTripleImg from "@/public/deocrations/Bg-Triple.png";

const positionClasses = {
  topLeft: "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
  bottomLeft: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
  topRight: "right-0 top-0 translate-x-1/2 -translate-y-1/2",
  bottomRight: "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
  center: "left-0 top-0 translate-y-1/2 translate-x-1/2",
};

interface BackgroundProps {
  className?: string;
  position?: keyof typeof positionClasses;
}

export const BgSingle = ({
  className,
  position = "center",
}: BackgroundProps) => {
  return (
    <Image
      src={bgSingleImg}
      alt={""}
      className={cn(
        "absolute -z-50 aspect-square size-[450px] object-contain",
        positionClasses[position], // Apply position classes dynamically
        className,
      )}
    />
  );
};
export const BgDouble = ({
  className,
  position = "center",
}: BackgroundProps) => {
  return (
    <Image
      src={bgDoubleImg}
      alt={""}
      className={cn(
        "absolute -z-50 size-[250px] object-contain md:size-[500px] lg:size-[700px]",
        positionClasses[position], // Apply position classes dynamically
        className,
      )}
    />
  );
};
export const BgTriple = ({
  className,
  position = "center",
}: BackgroundProps) => {
  return (
    <Image
      src={bgTripleImg}
      alt={""}
      className={cn(
        "absolute -z-50 aspect-square object-contain md:size-[750px] lg:size-[1000px]",
        positionClasses[position], // Apply position classes dynamically
        className,
      )}
    />
  );
};

export const Shades = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute -z-10 h-fit w-fit blur-2xl", className)}>
      <div className="inline-flex size-[250.39px] items-center justify-center">
        <div className="size-[234.81px] rounded-full bg-[#1eaac8] opacity-80"></div>
      </div>
    </div>
  );
};
