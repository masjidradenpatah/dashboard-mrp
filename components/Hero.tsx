import Image from "next/image";
import tower from "@/public/hero section/menara mrp.png";
import { Shades } from "@/components/decorations/shades";
import { CircleIcon } from "@/components/decorations/Icons";
import { Book, GraduationCap } from "lucide-react";

const Hero = () => {
  return (
    <section
      data-testid="hero-section"
      className={"relative flex h-[650px] w-full"}
    >
      <HeroBackground />
      <div className={"container flex"}>
        <HeroLeftSide />
        <HeroRightSide />
      </div>
    </section>
  );
};
export default Hero;

const HeroBackground = () => {
  return (
    <div className={"absolute -z-10 flex size-full"}>
      <div className="glassmorphic-lg h-full grow"></div>
      <div className="hidden h-full grow bg-secondary md:block"></div>
    </div>
  );
};

const HeroLeftSide = () => {
  return (
    <div className={"relative flex size-full flex-col justify-center md:w-1/2"}>
      <CircleIcon
        className={
          "absolute -rotate-12 sm:translate-x-12 md:translate-x-0 " +
          "-translate-y-24 md:-translate-y-44 lg:-translate-y-32 2xl:-translate-y-24"
        }
      >
        <Book />
      </CircleIcon>
      <CircleIcon
        className={
          "absolute right-0 -translate-y-12 rotate-12 sm:-translate-y-16 md:-translate-y-4 lg:-translate-y-16 2xl:-translate-y-10" +
          " -translate-x-8 sm:-translate-x-12 md:-translate-x-40 lg:-translate-x-16 xl:-translate-x-36 2xl:-translate-x-20"
        }
      >
        <GraduationCap />
      </CircleIcon>
      <p className={"text-center text-4xl text-muted-foreground md:text-left"}>
        Selamat Datang di
      </p>
      <h1
        className={
          "my-2 text-center text-7xl font-bold text-primary md:text-left"
        }
      >
        Masjid Raden Patah
      </h1>
      <p className={"text-center text-3xl text-muted-foreground md:text-left"}>
        Universitas Brawijaya
      </p>
    </div>
  );
};

const HeroRightSide = () => {
  return (
    <div className={"relative hidden h-full w-1/2 md:block"}>
      {/* Start background here */}
      <Shades className={"-translate-x-1/5 left-0 top-0 opacity-75"} />
      <Shades className={"bottom-0 right-0 translate-x-0 opacity-75"} />
      {/* End background here */}

      <div
        className={
          "absolute bottom-0 left-1/2 h-[566px] w-[353px] -translate-x-1/2 rounded-3xl rounded-b-none border-8 border-b-0 border-white"
        }
      />
      <Image
        src={tower}
        alt={"Gambar Menara MRP"}
        className={"absolute bottom-0 left-1/2 -translate-x-1/2"}
      />
    </div>
  );
};
