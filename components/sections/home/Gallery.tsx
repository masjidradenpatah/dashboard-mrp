import React from "react";
import SectionTitle from "@/components/SectionTitle";

import { BgSingle, BgTriple } from "@/components/decorations/shades";
import { GalleryDecoration, GalleryImageArr } from "@/data/GalleryImage";
import { GalleryImageDecoration } from "@/components/GalleryImage";
import { addBlurredDataUrls } from "@/lib/getBase64";

import Image from "next/image";
import { cn } from "@/lib/utils";

const Gallery = async () => {
  const processedImages = await addBlurredDataUrls(GalleryImageArr);
  return (
    <section
      data-testid="gallery-section"
      className={"relative w-full max-sm:px-4"}
    >
      {/* Start Background */}
      <BgSingle
        position={"topLeft"}
        className={"top-0 size-[700px] -translate-x-1/3 translate-y-0"}
      ></BgSingle>
      <BgTriple position={"bottomRight"} className={"translate-x-1/4"} />
      {/* End Background */}
      <div className={"container relative flex flex-col gap-16"}>
        <SectionTitle
          title={"Gallery Masjid Raden Patah"}
          subtitle={"Yuk keliling lihat pojok Masjid Raden Patah"}
        />
        <div className={"flex w-full gap-6 px-4 sm:px-8 md:px-0"}>
          <div className={"ms-auto lg:basis-9/12"}>
            <div
              className={
                "relative grid grid-cols-4 grid-rows-6 gap-3 md:gap-6 lg:basis-8/12"
              }
            >
              {processedImages.map(({ alt, className, ...props }, index) => (
                <Image
                  key={index}
                  {...props}
                  className={cn(
                    "size-full object-cover object-center",
                    className,
                  )}
                  alt={alt}
                  placeholder={"blur"}
                  width={302}
                  height={537}
                  priority
                />
              ))}

              {GalleryDecoration.map((decoration, index) => (
                <GalleryImageDecoration key={index} {...decoration} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Gallery;
