import React from "react";
import { ImageKitImage } from "@/components/ImageKit";
import { cn } from "@/lib/utils";
import { Program } from "@prisma/client";

type Props = {
  program: Program; // Program bisa null
  className: string;
};

const ProgramPreview = ({ program, className }: Props) => {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <ImageKitImage
        height={300}
        width={300}
        alt={`Gambar dari program ${program.title}`}
        path={program.image}
        className={"rounded-2xl border-4 border-white shadow-xl"}
      />
      <div className={"space-y-4"}>
        <h2 className={"text-center text-3xl font-bold"}>{program.title}</h2>
        <p
          className={
            "mx-auto w-fit rounded-lg bg-emerald-500 px-4 py-2 text-white"
          }
        >
          {program.type !== "ANNUALY"
            ? "Program Rutin Harian"
            : "Program Tahunan"}
        </p>
      </div>
      <p className={"line-clamp-6 text-justify"}>{program.description}</p>
    </div>
  );
};
export default ProgramPreview;
