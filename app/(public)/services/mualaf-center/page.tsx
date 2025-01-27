import React from "react";
import ServiceCTA from "@/components/ServiceCTA";
import { ImageKitImage } from "@/components/ImageKit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Mualaf Center",
  description: "Layanan Mualaf Center Masjid Raden Patah Universitas Brawijaya",
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
        <h1 className={"text-5xl font-bold tracking-wide"}>Mualaf Center</h1>
      </section>

      <section className="container flex justify-between gap-8 xl:max-w-screen-lg">
        <div className={"space-y-8 text-lg"}>
          <p className={"text-justify"}>
            Masjid Raden Patah Universitas Brawijaya menyediakan layanan khusus
            bagi para mualaf yang membutuhkan dukungan dalam proses memulai
            perjalanan baru sebagai seorang Muslim. Kami hadir untuk memberikan
            bimbingan, pembelajaran, serta pendampingan spiritual agar para
            mualaf dapat memahami Islam dengan baik dan mendalam.
          </p>

          <h2 className={"mb-4 text-center text-2xl font-medium"}>
            Kami Hadir sebagai solusi
          </h2>
          <p className="text-justify">
            Kami memahami tantangan yang dihadapi para mualaf dalam beradaptasi
            dengan ajaran Islam. Oleh karena itu, Mualaf Center menawarkan
            program bimbingan agama, kelas pengenalan dasar Islam, hingga
            dukungan emosional dan sosial. Dengan suasana yang hangat dan penuh
            perhatian, kami siap membantu setiap mualaf dalam menemukan
            kedamaian dan keyakinan di dalam Islam.
          </p>

          <h2 className={"mb-4 text-center text-2xl font-medium"}>
            Gallery layanan mualaf center
          </h2>
          <div className="flex gap-4">
            <div className="aspect-square w-1/3 bg-white">
              <ImageKitImage
                height={330}
                width={330}
                path={"/services/mualaf1.jpg"}
                className={"max-w-1/3"}
                alt={"mualaf 1"}
              />
            </div>
            <div className="aspect-square w-1/3 bg-white">
              <ImageKitImage
                height={330}
                width={330}
                path={"/services/mualaf2.jpg"}
                className={"max-w-1/3"}
                alt={"mualaf 1"}
              />
            </div>
            <div className="aspect-square w-1/3 bg-white">
              <ImageKitImage
                height={330}
                width={330}
                path={"/services/mualaf3.png"}
                alt={"mualaf 1"}
                className={"max-w-1/3"}
              />
            </div>
          </div>

          <h2 className={"mb-4 text-center text-2xl font-medium"}>
            Apa kata mereka
          </h2>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
            placeat praesentium tempora? Ab accusamus accusantium asperiores
            atque cupiditate dignissimos ea earum eius fugit impedit laboriosam
            maxime, mollitia nemo odit officia perspiciatis placeat quidem
            reiciendis rem, saepe sint soluta unde voluptas! A ad adipisci animi
            aspernatur, cum ducimus enim, expedita explicabo fugit in inventore
            iste necessitatibus numquam obcaecati perferendis quasi reiciendis
            reprehenderit sequi tempora ullam vitae voluptatem voluptatibus
            voluptatum! Aperiam cum expedita illo neque nisi quia.
          </p>
        </div>
      </section>

      <ServiceCTA className={"container xl:max-w-screen-lg"}></ServiceCTA>
    </div>
  );
};
export default Page;
