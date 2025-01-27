import { ImageProps } from "next/image";
import config from "@/lib/config";

export const GalleryDecoration = [
  {
    className: "galleryItem2 relative -translate-x-1/3 overflow-visible ",
    chldrenClassName: "bg-gradient-to-br from-[#99E9FB] to-[#1EAAC8]",
    variants: {
      hidden: { x: -200 },
      visible: { x: 0 },
    },
    transition: {
      duration: 4,
    },
  },
  {
    className: "galleryItem11 translate-y-1/3 overflow-visible",
    chldrenClassName: "bg-gradient-to-br from-[#99E9FB] to-[#1EAAC8]",
    variants: {
      hidden: { y: 200 },
      visible: { y: 0 },
    },
    transition: {
      duration: 3,
    },
  },
  {
    className: "galleryItem14 translate-x-1/2 overflow-visible ",
    chldrenClassName: "bg-gradient-to-tr from-[#8DE3F6] to-[#1EAAC8]",
    variants: {
      hidden: { x: 200 },
      visible: { x: 0 },
    },
    transition: {
      duration: 3,
    },
  },
];

export const GalleryImageArr: ImageProps[] = [
  {
    className: "galleryItem1",
    src: `${config.env.appUrl}/gallery/gallery1.jpg`,
    sizes: "(min-width: 1540px) 434px, (min-width: 1280px) 358px, 282px",
    alt: "Gallery Masjid Raden Patah",
  },

  {
    className: "galleryItem3",
    src: `${config.env.appUrl}/gallery/gallery3.jpg`,
    sizes: "(min-width: 1540px) 434px, (min-width: 1280px) 358px, 282px",
    alt: "Gallery Masjid Raden Patah",
  },

  {
    className: "galleryItem4",
    src: `${config.env.appUrl}/gallery/gallery4.jpg`,
    sizes: "(min-width: 1540px) 434px, (min-width: 1280px) 358px, 282px",
    alt: "Gallery Masjid Raden Patah",
  },
  {
    className: "galleryItem5",
    src: `${config.env.appUrl}/gallery/gallery5.jpg`,
    sizes: "(min-width: 1540px) 366px, (min-width: 1280px) 302px, 238px",
    alt: "Gallery Masjid Raden Patah",
  },
  {
    className: "galleryItem6",
    src: `${config.env.appUrl}/gallery/gallery6.jpg`,
    sizes: "(min-width: 1540px) 370px, (min-width: 1280px) 307px, 244px",
    alt: "Gallery Masjid Raden Patah",
  },
  {
    className: "galleryItem7 h-full w-full",
    src: `${config.env.appUrl}/gallery/gallery7.jpg`,
    sizes: "(min-width: 1540px) 756px, (min-width: 1280px) 628px, 500px",
    alt: "Gallery Masjid Raden Patah",
  },
  {
    className: "galleryItem8",
    src: `${config.env.appUrl}/gallery/gallery8.jpg`,
    sizes: "(min-width: 1540px) 440px, (min-width: 1280px) 364px, 288px",
    alt: "Gallery Masjid Raden Patah",
  },
  {
    className: "galleryItem9",
    src: `${config.env.appUrl}/gallery/gallery9.jpg`,
    sizes: "(min-width: 1540px) 440px, (min-width: 1280px) 364px, 288px",
    alt: "Gallery Masjid Raden Patah",
  },
  {
    className: "galleryItem10",
    src: `${config.env.appUrl}/gallery/gallery10.jpg`,
    sizes: "(min-width: 1540px) 366px, (min-width: 1280px) 302px, 238px",
    alt: "Gallery Masjid Raden Patah",
  },

  {
    className: "galleryItem12",
    src: `${config.env.appUrl}/gallery/gallery12.jpg`,
    sizes: "(min-width: 1540px) 366px, (min-width: 1280px) 302px, 238px",
    alt: "Gallery Masjid Raden Patah",
  },
  {
    className: "galleryItem13",
    src: `${config.env.appUrl}/gallery/gallery13.jpg`,
    sizes: "(min-width: 1540px) 366px, (min-width: 1280px) 302px, 238px",
    alt: "Gallery Masjid Raden Patah",
  },

  {
    className: "galleryItem15",
    src: `${config.env.appUrl}/gallery/gallery15.jpg`,
    sizes: "(min-width: 1540px) 366px, (min-width: 1280px) 302px, 238px",
    alt: "Gallery Masjid Raden Patah",
  },
];
