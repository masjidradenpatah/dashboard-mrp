import React from "react";
import { BgSingle, Shades } from "@/components/decorations/shades";
import Image from "next/image";
import donate from "@/public/donate.svg";
import qris from "@/public/qirs_mrp.png";

const Donate = () => {
  return (
    <section
      data-testid="donate-section"
      className={"relative h-fit w-full p-4"}
    >
      {/*  Start Background Here*/}
      <BgSingle
        position={"bottomLeft"}
        className={"-translate-x-1/3 translate-y-2/3 blur-sm lg:size-[800px]"}
      />

      {/*  End Background Here*/}
      <div
        className={
          "glassmorphic-lg container flex w-full flex-col items-center gap-12 overflow-hidden rounded-3xl border-8 border-white lg:gap-10" +
          " !bg-white/20 p-12" +
          " lg:flex-row"
        }
      >
        <Shades
          className={
            "translate-x-1/5 right-0 top-0 -translate-y-1/4 opacity-50 blur-3xl"
          }
        />
        <Shades
          className={
            "bottom-0 left-0 -translate-x-1/4 translate-y-1/3 opacity-75 blur-3xl"
          }
        />
        <div
          className={
            "flex w-full flex-col items-center justify-center gap-12 lg:w-1/2"
          }
        >
          <p
            className={
              "text-center text-2xl leading-snug sm:text-3xl lg:text-4xl"
            }
          >
            Mari Membersamai{" "}
            <span className={"text-nowrap font-bold text-primary"}>
              Masjid Raden Patah
            </span>{" "}
            dalam Pembuatan Konten Dakwah
          </p>
          <Image src={donate} alt={"box and love icon"} />
        </div>
        <div className={"flex w-full justify-center gap-3 lg:w-1/2"}>
          <Image
            src={qris}
            alt={"Kode Qris MRP"}
            className={"h-full w-[500px] object-contain"}
          ></Image>
        </div>
      </div>
    </section>
  );
};
export default Donate;
