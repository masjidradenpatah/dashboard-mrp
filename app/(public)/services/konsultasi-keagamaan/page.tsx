import React from "react";
import ServiceCTA from "@/components/ServiceCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Konsultasi Keagamaan",
  description:
    "Layanan Konsultasi Keagamaan Masjid Raden Patah Universitas Brawijaya",
};

const Page = () => {
  return (
    <div
      className={
        "mt-32 flex size-full flex-col items-center gap-12 overflow-hidden px-4 py-24 sm:px-0 md:gap-24"
      }
    >
      <section
        className={
          "glassmorphic-sm container relative flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-white/35 px-4 xl:max-w-screen-lg" +
          " py-12"
        }
      >
        <p className={"max-w-prose"}>
          Layanan Masjid Raden Patah Universitas Brawijaya
        </p>
        <h1 className={"text-5xl font-bold tracking-wide"}>
          Konsultasi Keagamaan
        </h1>
      </section>

      <section className="container flex justify-between gap-8 xl:max-w-screen-lg">
        <div className={"space-y-8 text-lg"}>
          <p className={"text-justify"}>
            Masjid Raden Patah Universitas Brawijaya menyediakan layanan
            konsultasi keagamaan untuk membantu jamaah dalam menyelesaikan
            berbagai permasalahan yang berkaitan dengan kehidupan spiritual,
            sosial, maupun pribadi dari sudut pandang Islam.
          </p>

          <h2 className={"mb-4 text-center text-2xl font-medium"}>
            Kami Hadir sebagai solusi
          </h2>
          <p className="text-justify">
            Dengan didukung oleh para ustadz dan pembimbing yang berkompeten,
            layanan ini dirancang untuk memberikan panduan yang sesuai dengan
            prinsip syariat Islam. Apakah Anda menghadapi pertanyaan tentang
            fiqih, keluarga, atau isu-isu lain, kami siap menjadi teman diskusi
            yang terpercaya, memberikan nasihat dan solusi yang mendalam.
          </p>
        </div>
      </section>

      <ServiceCTA className={"container xl:max-w-screen-lg"}></ServiceCTA>
    </div>
  );
};
export default Page;
