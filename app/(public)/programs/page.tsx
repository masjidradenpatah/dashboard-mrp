import React from "react";

import { UpcomingProgramRender } from "@/components/UpcomingProgramRender";
import { ProgramRender } from "@/components/ProgramRender";

const Page = () => {
  return (
    <div
      className={
        "flex size-full flex-col items-center gap-32 overflow-hidden py-32"
      }
    >
      <section
        data-testid="daily-program-section"
        className={"flex w-full flex-col gap-32 py-24"}
      >
        <UpcomingProgramRender
          title={"Program yang Akan Datang"}
          subtitle={"Jangan sampai ketinggalan..."}
        />

        <ProgramRender
          title={"Program Rutin Harian"}
          subtitle={"Ikuti program kajian favorit kalian..."}
          type={"DAILY"}
          numberItemShown={"all"}
        />
        <ProgramRender
          title={"Program Tahunan"}
          subtitle={"Ikuti program kajian favorit kalian..."}
          type={"ANNUALY"}
          numberItemShown={"all"}
        />
      </section>
    </div>
  );
};
export default Page;
