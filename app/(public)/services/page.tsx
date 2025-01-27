import React from "react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import mualaf from "@/public/services/mualaf center.png";
import marriage from "@/public/services/akad nikah.png";
import consult from "@/public/services/konsutasi keagamaan.png";
import ServiceCTA from "@/components/ServiceCTA";

const Page = () => {
  return (
    <div
      className={
        "mt-32 flex size-full flex-col items-center gap-12 overflow-hidden px-4 py-32 sm:px-0 md:gap-24"
      }
    >
      <section
        data-testid="services-section"
        className={"container relative w-full space-y-24 p-4"}
      >
        <SectionTitle
          title={"Layanan Jama'ah"}
          subtitle={"Berbagai pilihan layanan siap membantu anda..."}
        ></SectionTitle>
        <div className="flex flex-col gap-12">
          <ServiceCard
            title={"Mualaf Center"}
            description={
              "<b>Lorem ipsum</b> dolor sit amet, consectetur <b>adipisicing elit</b>. Accusamus exercitationem numquam odio quam, sint suscipit" +
              " unde.  Laudantium, obcaecati, voluptatum? Consectetur cum dicta ea enim eveniet maxime omnis quos tempore vel?"
            }
            image={mualaf}
            location={"Ruang layanan bersama Masjid Raden Patah"}
            link={"/services/mualaf-center"}
          />
          <ServiceCard
            title={"Konsultasi Keagamaan"}
            description={
              "Lorem ipsum <b>dolor sit amet</b>, consectetur adipisicing elit. Accusamus exercitationem numquam odio quam, sint suscipit unde." +
              " Laudantium, obcaecati, voluptatum? <b>Consectetur cum dicta</b> ea enim eveniet maxime omnis quos tempore vel?"
            }
            image={consult}
            location={"Ruang layanan bersama Masjid Raden Patah"}
            link={"/services/konsultasi-keagamaan"}
          />
          <ServiceCard
            title={"Akad Nikah"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. <b>Accusamus exercitationem numquam</b> odio quam, sint suscipit unde." +
              " Laudantium, obcaecati, voluptatum? Consectetur cum dicta ea enim eveniet maxime omnis quos tempore vel?"
            }
            image={marriage}
            location={"Ruang layanan bersama Masjid Raden Patah"}
            link={"/services/akad-nikah"}
          />
        </div>
      </section>

      {/*  */}
      <ServiceCTA></ServiceCTA>
      {/*  */}
    </div>
  );
};
export default Page;
