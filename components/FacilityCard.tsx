import Image, { StaticImageData } from "next/image";
import {
  CardContent,
  Card,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Shades } from "@/components/decorations/shades";
import React from "react";

interface FacilityProps {
  image: StaticImageData;
  title: string;
}

const FacilityCard = ({ image, title }: FacilityProps) => {
  return (
    <Card className={"h-full w-[300px] overflow-hidden"}>
      <CardHeader className={"relative"}>
        <Shades
          className={
            "left-0 top-0 z-0 -translate-x-1/2 -translate-y-1/2 scale-50 blur-3xl"
          }
        />
      </CardHeader>
      {/*image here*/}
      <CardContent className={"grid w-fit place-content-center"}>
        <Image
          src={image}
          className={
            "aspect-square size-[254px] rounded-full border-8 border-secondary object-cover shadow-xl"
          }
          alt={"fasilitas di masjid raden" + " patah"}
        />
      </CardContent>
      <CardFooter
        className={"relative flex w-full flex-col items-center justify-center"}
      >
        <Shades
          className={
            "bottom-0 right-0 z-0 translate-x-1/2 translate-y-1/2 scale-50 blur-3xl"
          }
        />
        <p
          className={
            "h-fit w-full grow-0 items-center justify-center text-center text-xl font-medium"
          }
        >
          {title}
        </p>
      </CardFooter>
    </Card>
  );
};
export default FacilityCard;
