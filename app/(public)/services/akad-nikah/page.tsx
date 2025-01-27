import React from "react";
import ServiceCTA from "@/components/ServiceCTA";
import { ImageKitImage } from "@/components/ImageKit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Akad Nikah",
  description: "Layanan akad nikah Masjid Raden Patah Universitas Brawijaya",
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
          Layanan Akad Nikah
        </h1>
      </section>

      <section className="container flex justify-between gap-8 xl:max-w-screen-lg">
        <div className={"space-y-8 text-lg"}>
          <p className={"text-justify"}>
            Masjid Raden Patah Universitas Brawijaya menyediakan layanan akad
            nikah dengan suasana khidmat dan penuh keberkahan. Dengan fasilitas
            yang nyaman, lokasi strategis, serta dukungan tim yang profesional,
            kami berkomitmen membantu Anda dalam menyelenggarakan momen istimewa
            dengan lancar dan berkesan.
          </p>

          <h2 className={"mb-4 text-center text-2xl font-medium"}>
            Kami Hadir sebagai solusi
          </h2>
          <p className="text-justify">
            Kami memahami pentingnya pelaksanaan akad nikah yang sesuai dengan
            nilai-nilai syariah dan penuh keindahan. Oleh karena itu, kami
            menawarkan layanan yang mencakup penyediaan tempat, dekorasi
            sederhana, serta dukungan teknis lainnya sesuai kebutuhan. Bersama
            Masjid Raden Patah, wujudkan momen sakral Anda dengan suasana yang
            menenangkan dan penuh keberkahan.
          </p>

          <h2 className={"mb-4 text-center text-2xl font-medium"}>
            Gallery layanan akad nikah
          </h2>
          <div className="flex gap-4">
            <div className="aspect-square w-1/3 bg-white">
              <ImageKitImage
                height={330}
                width={330}
                path={"/services/nikah1.png"}
                className={"max-w-1/3"}
                alt={"Gambar layanan akad nikah"}
              />
            </div>
            <div className="aspect-square w-1/3 bg-white">
              <ImageKitImage
                height={330}
                width={330}
                path={"/services/nikah2.png"}
                className={"max-w-1/3"}
                alt={"Gambar layanan akad nikah"}
              />
            </div>
            <div className="aspect-square w-1/3 bg-white">
              <ImageKitImage
                height={330}
                width={330}
                path={"/services/nikah3.png"}
                alt={"Gambar layanan akad nikah"}
                className={"max-w-1/3"}
              />
            </div>
          </div>
        </div>
      </section>

      <ServiceCTA className={"container xl:max-w-screen-lg"}></ServiceCTA>
    </div>
  );
};
export default Page;
