import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface Props {
  title: string;
  description: string;
  link: string;
  image: string | StaticImageData;
  location: string;
}

const ServiceCard = ({ title, description, link, image, location }: Props) => {
  return (
    <Card className={"glassmorphic-lg border-8 border-white bg-white/35"}>
      <CardHeader className={"p-4 text-center lg:hidden"}>
        <h2 className={"text-3xl font-bold text-primary md:text-4xl"}>
          {title}
        </h2>
      </CardHeader>
      <CardContent
        className={"flex w-full flex-col gap-6 p-4 pt-0 sm:p-6 lg:flex-row"}
      >
        <Image
          src={image}
          alt={title}
          className={
            "w-full rounded-lg md:object-contain lg:w-1/2 lg:object-cover"
          }
        />
        <div className={"flex w-full flex-col justify-center gap-8 lg:w-1/2"}>
          <h2 className={"hidden text-4xl font-bold text-primary lg:block"}>
            {title}
          </h2>
          <p
            className={"line-clamp-4 text-lg"}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
          <div className={"flex items-center gap-4"}>
            <div className="grid aspect-square size-12 place-content-center rounded-2xl bg-gradient-to-tr from-[#D9D9D9] to-[#1FAAC8]">
              {/*  */}
              <MapPin className={"text-white"} />
              {/*  */}
            </div>
            <p className={"text-base font-medium sm:text-xl"}>{location}</p>
          </div>
          <Button variant={"fullPrgram"} className={"py-6"} asChild>
            <Link href={link}>Selengkapnya</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default ServiceCard;
