import React from "react";
import profile from "@/public/profile.png";
import Image from "next/image";
import { BgDouble, Shades } from "@/components/decorations/shades";

const Profile = () => {
  return (
    <section
      data-testid="profile-section"
      className={"relative w-full max-sm:px-4"}
    >
      {/* Start Background Here*/}
      <BgDouble
        className={"size-[650px] -translate-x-1/4 translate-y-1/3 -rotate-12"}
        position={"bottomLeft"}
      />
      {/* End Background Here*/}

      <div
        className={
          "glassmorphic-lg container flex w-full flex-col gap-10 overflow-hidden rounded-3xl border-8 border-white !bg-white/20 px-4 py-10" +
          " lg:p-12" +
          " lg:flex-row"
        }
      >
        {/* Start Background Here*/}
        <Shades
          className={"translate-x-1/5 right-0 top-0 -translate-y-1/4 blur-3xl"}
        />
        <Shades
          className={
            "bottom-0 left-0 -translate-x-1/4 translate-y-1/3 blur-3xl"
          }
        />
        {/* End Background Here*/}
        <h2
          className={
            "text-center text-4xl font-bold sm:text-5xl md:text-6xl lg:hidden"
          }
        >
          Masjid <span className={"text-nowrap text-primary"}>Raden Patah</span>
        </h2>
        <div
          className={
            "flex flex-col justify-center gap-10 max-lg:items-center lg:flex-row"
          }
        >
          <Image
            src={profile}
            alt={"Gambar Menara Masjid Raden Patah"}
            className={
              "aspect-square w-2/3 rounded-3xl object-contain max-md:min-w-[200px] md:w-1/2 lg:w-1/3"
            }
          />

          <div className={"flex flex-col gap-3"}>
            <h2 className={"hidden text-6xl font-bold lg:block"}>
              Masjid{" "}
              <span className={"text-nowrap text-primary"}>Raden Patah</span>
            </h2>
            <p className={"text-lg font-light max-lg:text-justify lg:text-xl"}>
              Masjid Raden Patah merupakan masjid kampus terbesar yang ada di
              lingkungan civitas akademika Universitas Brawijaya. Masjid Raden
              Patah berdiri sejak tahun 1975 dan hanya menampung sebanyak 200
              jamaah. Masjid ini mengalami pemugaran, dengan meratakan bangunan
              lama dan memulai pembangunan masjid yang baru dengan arsitektur
              bergaya Majapahit. Masjid Raden Patah diresmikan kembali pada
              tahun 2018 dan kini dapat menampung sekitar 7.000 jamaah.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Profile;
