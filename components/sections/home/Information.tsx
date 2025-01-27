"use client";
import { BgSingle, BgTriple } from "@/components/decorations/shades";
import React from "react";
import { UpcomingProgramRender } from "@/components/UpcomingProgramRender";

const Information = () => {
  return (
    <section data-testid="information-section" className={"w-full"}>
      <div className="container relative flex flex-col items-center gap-8 max-sm:px-4 lg:gap-16">
        {/* Start Background*/}
        <BgSingle
          className={"size-[450px] -translate-x-2/3 -translate-y-1/3"}
          position={"topLeft"}
        />
        <BgTriple
          className={"size-[1000px] translate-x-2/3 translate-y-1/2"}
          position={"bottomRight"}
        />
        {/* End Background*/}

        {/* Upcoming Innformation Here */}
        {/*<UpcomingProgramList*/}
        {/*  title={"Program yang Akan Datang"}*/}
        {/*  subtitle={"Jangan sampai ketinggalan..."}*/}
        {/*/>*/}
        <UpcomingProgramRender
          title={"Program yang Akan Datang"}
          subtitle={"Jangan sampai ketinggalan..."}
        />
        {/* Upcoming Innformation Here */}
      </div>
    </section>
  );
};
export default Information;
