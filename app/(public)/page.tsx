import Hero from "@/components/sections/home/Hero";
import Information from "@/components/sections/home/Information";
import Profile from "@/components/sections/home/Profile";
import Map from "@/components/sections/home/Map";
import Facilities from "@/components/sections/home/Facilities";
import Gallery from "@/components/sections/home/Gallery";
import Donate from "@/components/sections/home/Donate";

export default function Home() {
  return (
    <div
      className={
        "flex size-full flex-col items-center gap-32 overflow-hidden py-32"
      }
    >
      <Hero />
      <Information />
      <Profile />
      <Facilities />
      <Gallery />
      <Donate />
      <Map />
    </div>
  );
}
