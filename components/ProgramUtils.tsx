import React, { ReactNode } from "react";
import SectionTitle from "@/components/SectionTitle";
import handPray from "@/public/hand-pray.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export const ProgramListLoading = ({
  numberItemShown,
}: {
  numberItemShown?: number | "all";
}) => {
  return (
    <>
      {Array.from({
        length:
          numberItemShown === undefined || numberItemShown === "all"
            ? 3
            : numberItemShown,
      }).map((_, i) => {
        return (
          <div
            key={i}
            className={
              "glassmorphic-lg sm:rounded-5xl flex h-fit flex-col justify-end gap-4 rounded-2xl border-2 border-white px-2 py-2 " +
              " sm:px-6 sm:pb-8" +
              " mt-0 sm:mt-24 lg:mt-12 xl:mt-36 2xl:mt-56" +
              " relative sm:h-[323px]"
            }
          >
            <div
              className={
                "relative flex aspect-square items-center justify-center rounded-2xl border-2 border-white bg-[#ededed]"
              }
            >
              <LoaderCircle
                className={"size-12 animate-spin text-gray-400 lg:size-16"}
              />
            </div>
            <Button variant={"fullPrgram"} className={"py-6"} disabled>
              Loading{" "}
              <LoaderCircle className={"size-12 animate-spin"}> </LoaderCircle>
            </Button>
          </div>
        );
      })}
    </>
  );
};

export const ProgramListWrapper = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) => {
  return (
    <div className="container relative flex flex-col items-center gap-8 max-sm:px-4 lg:gap-16">
      <SectionTitle title={title} subtitle={subtitle} className={"sm:w-full"} />
      <div
        className={
          "grid w-full grid-cols-1 place-content-center gap-x-6 gap-y-12 max-sm:max-w-[400px] sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        }
      >
        {children}
      </div>
    </div>
  );
};

export const ErrorMessage = ({
  title,
  subtitle,
  message,
}: {
  title: string;
  subtitle: string;
  message: string;
}) => {
  return (
    <ProgramListWrapper title={title} subtitle={subtitle}>
      <div className={"relative w-full sm:col-span-2 lg:col-span-3"}>
        {/*<ProgramListLoading numberItemShown={1}></ProgramListLoading>*/}
        <div
          className={
            "flex h-fit w-full flex-col gap-4 rounded-2xl px-2 py-2 " +
            " min-h-[400px] sm:px-6 sm:pb-8" +
            " mt-0 sm:mt-24 lg:mt-12 xl:mt-36 2xl:mt-56" +
            " sm:h-[323px]"
          }
        >
          {/*<div*/}
          {/*  className={*/}
          {/*    "relative hidden aspect-square rounded-2xl border-2 border-white bg-[#ededed]"*/}
          {/*  }*/}
          {/*></div>*/}
          {/*<Button variant={"ghost"} className={"py-6"} disabled></Button>*/}
          <div
            className={
              "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            }
          >
            <Image
              src={handPray}
              alt="ikon mohon maaf"
              className="inline size-16"
            />
            <p className="py-8 text-center text-4xl font-semibold text-primary/75">
              {message}
            </p>
          </div>
        </div>
      </div>
    </ProgramListWrapper>
  );
};
