import React from "react";
import Image from "next/image";
import map from "@/public/map.png";
import { BgDouble } from "@/components/decorations/shades";

const Map = () => {
  return (
    <section data-testid="map-section" className={"relative w-full p-4"}>
      {/*  Start Background Here*/}
      <BgDouble position={"bottomRight"} className={"lg:size-[740px]"} />
      {/*  End Background Here*/}
      <div className={"container my-[120px]"}>
        <div
          className={
            "flex w-full flex-col overflow-hidden rounded-3xl border-8 border-white shadow-lg md:flex-row"
          }
        >
          <div className={"basis-2/3 max-md:order-last"}>
            {/*  Disini untuk iframe map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d880.0865945008982!2d112.61492695609108!3d-7.95185779950368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e788279f439843f%3A0x519c1d4fdcc0cbd0!2sMasjid%20Raden%20Patah%20UB!5e0!3m2!1sid!2sid!4v1735554050474!5m2!1sid!2sid"
              className={"aspect-video size-full border-none"}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div
            className={
              "relative flex basis-1/3 flex-col justify-end bg-primary max-md:aspect-video"
            }
          >
            {/*  Disini untuk Gambar & Keterangan Loaksi*/}
            <Image
              src={map}
              alt={"gambar masjid raden patah"}
              className={"absolute size-full object-cover"}
            />
            <div
              className={"inset-0 bg-gradient-to-t from-primary" + " absolute"}
            />
            <div className={"space-y-4 p-4 text-white lg:p-12"}>
              <p className={"relative z-20 text-xl lg:text-3xl"}>
                Jl. Kampus Universitas Brawijaya
              </p>
              <p className={"relative z-20 text-lg"}>
                Ketawanggede, Lowokwaru Kota Malang, Jawa Timur 65145
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Map;
