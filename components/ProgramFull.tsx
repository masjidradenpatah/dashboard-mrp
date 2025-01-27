import React from "react";
import { ImageKitImage } from "@/components/ImageKit";
import { cn } from "@/lib/utils";
import { Maximize2 } from "lucide-react";
import { Program } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  program: Program; // Program bisa null
  className: string;
};

const ProgramPreview = ({ program, className }: Props) => {
  return (
    <Card
      className={cn(
        "container relative my-24 items-center shadow-2xl",
        className,
      )}
    >
      <CardHeader>
        <h2 className={"text-center text-3xl font-bold"}>{program.title}</h2>
        <p
          className={
            "absolute right-4 top-6 ms-auto mt-0 w-fit rounded-lg bg-emerald-500 px-4 py-2 text-white"
          }
        >
          {program.type !== "ANNUALY"
            ? "Program Rutin Harian"
            : "Program Tahunan"}
        </p>
      </CardHeader>
      <CardContent className={"relative"}>
        <ImageKitImage
          height={300}
          width={300}
          alt={`Gambar dari program ${program.title}`}
          path={program.image}
          className={"mx-auto mb-8 rounded-2xl border-4 border-white shadow-xl"}
        />

        <article
          className={
            "space-y-4 text-justify lg:text-lg [&_p]:mx-auto [&_p]:[text-indent:2em] [&_p]:xl:max-w-screen-lg"
          }
          dangerouslySetInnerHTML={{ __html: program.content }}
        />
        {program.customeUrl && (
          <>
            <Button variant={"outline"} asChild>
              <Link href={program.customeUrl} className={"mt-4"}>
                See full detail <Maximize2 />
              </Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default ProgramPreview;
