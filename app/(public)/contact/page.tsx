import React from "react";
import Image from "next/image";
import { Shades } from "@/components/decorations/shades";
import Map from "@/components/sections/home/Map";
import SectionTitle from "@/components/SectionTitle";
import community from "@/public/community_link.png";
import Link from "next/link";
import { CircleIcon } from "@/components/decorations/Icons";
import wa from "@/public/icons/whatsapp icon white.svg";
import { Button } from "@/components/ui/button";
import { MessageCirclePlus } from "lucide-react";

const Page = () => {
  return (
    <div
      className={
        "mt-32 flex size-full flex-col items-center gap-6 overflow-hidden px-4 py-32 sm:gap-12 md:gap-24 lg:px-0"
      }
    >
      <SectionTitle
        title={"Kontak Kami"}
        subtitle={"Hubungi kami jika ada yang ditanyakan"}
        className={"container w-full"}
      />
      <section data-testid="contact-section" className={"relative w-full p-4"}>
        <div
          className={
            "glassmorphic-lg container relative flex flex-col gap-6 overflow-hidden rounded-3xl border-8 border-white bg-white/35 px-7 md:flex-row" +
            " py-5"
          }
        >
          {/*  Start Background Here*/}
          <Shades
            className={
              "bottom-0 left-0 -translate-x-1/4 translate-y-1/3 opacity-50"
            }
          />
          <Shades
            className={
              "right-0 top-0 -translate-y-1/3 translate-x-1/4 opacity-50"
            }
          />
          {/*  End Background Here*/}

          <div className={"flex basis-7/12 flex-col items-center gap-6"}>
            <div className={"space-y-2 text-center"}>
              <p className={"text-2xl font-bold md:text-3xl"}>
                Kemudahan mengakses informasi kegiatan
              </p>
              <p className={"text-lg"}>
                yang ada di Masjid Raden Patah Universitas Brawijaya
              </p>
            </div>
            <Button asChild variant={"link"}>
              <Link href={""} className={"size-fit text-xl"}>
                <MessageCirclePlus className={"me-2 scale-150"} />
                Join Komunitas MRP
              </Link>
            </Button>
            <Image
              src={community}
              alt={"link whatsapp komunitas jama'ah MRP"}
            />
          </div>
          <div
            className={
              "flex grow flex-col justify-center gap-2 max-md:items-center"
            }
          >
            {/*  Start Contact Infomation */}
            <div
              className={
                "group flex flex-col gap-2 text-primary transition duration-200"
              }
            >
              <p
                className={"text-2xl font-medium group-hover:text-emerald-500"}
              >
                Atau hubungi
              </p>
              <Link
                href={"https://wa.me/628993117777"}
                className={
                  "relative w-fit text-3xl font-bold transition duration-200 group-hover:text-emerald-500 md:text-4xl lg:text-5xl"
                }
              >
                <CircleIcon
                  className={
                    "absolute right-0 top-0 -translate-y-2/3 translate-x-2/3 rotate-12 scale-75 shadow-lg md:scale-100"
                  }
                  innerClassName={
                    "group-hover:from-emerald-500 transition duration-200  group-hover:to-emerald-500"
                  }
                >
                  <Image
                    className={"size-5 md:size-6"}
                    src={wa}
                    alt={"whatsaapp 0899 311 7777"}
                  />
                </CircleIcon>
                0899 311 7777
              </Link>
              <p
                className={
                  "text-2xl font-medium transition duration-200 group-hover:text-emerald-500"
                }
              >
                (Whatsapp Only)
              </p>
            </div>
            {/*  End Contact Infomation */}
          </div>
        </div>
      </section>
      <Map />
    </div>
  );
};
export default Page;
