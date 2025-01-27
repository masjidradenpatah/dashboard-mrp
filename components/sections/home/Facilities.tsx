"use client";
import React, { useEffect, useState } from "react";
import FacilityCard from "@/components/FacilityCard";
import { motion } from "framer-motion";

import { facilities } from "@/data/Facilities";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const Facilities = () => {
  // Variants Start Here
  const parentVariant = {
    hidden: {},
    justifyBetween: {},
    exit: {},
  };
  const childVariant = {
    hidden: { opacity: 0, y: 0, x: 0 },
    exit: { opacity: 0, y: 0, x: 0 },
    justifyBetween: ({
      index,
      parentWidth,
      numberItem,
    }: {
      index: number;
      parentWidth: number;
      numberItem: number;
      boxWidth: number;
    }) => {
      const boxWidth = parentWidth / numberItem;
      let calculatedBoxStartPos: number = index * boxWidth;
      if (boxWidth <= 301) calculatedBoxStartPos += 32 * index - 1;

      let opacity = 1;
      let blur: string = "blur(0px)";
      if (index === 4 || index === 0) {
        if (parentWidth > 1536) {
          opacity = 0.7;
          blur = "blur(2px)";
        }
      }
      return {
        opacity,
        x: calculatedBoxStartPos,
        y: 0,
        filter: blur,
        transition: {
          ease: "easeInOut",
          type: "tween",
          // delay: 0.04 * index,
        },
      };
    },
  };
  // Variants End Here

  const [parentWidth, setParentWidth] = useState(0);

  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (parentWidth === 0) setParentWidth(window.innerWidth);

    const handleResize = () => {
      setParentWidth(window.innerWidth);
      if (window.innerWidth < 1536) setParentWidth(1536);
    };

    // Tambahkan event listener
    window.addEventListener("resize", handleResize);

    // Bersihkan event listener saat komponen unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [parentWidth]);

  const prev = () => {
    setParentWidth(window.innerWidth);
    if (window.innerWidth < 1536) setParentWidth(1536);

    // Update current and loop
    const newCurrent = (current - 1) % facilities.length;

    setCurrent(newCurrent < 0 ? facilities.length - 1 : newCurrent);
  };

  const next = () => {
    setParentWidth(window.innerWidth);
    if (window.innerWidth < 1536) setParentWidth(1536);

    // Update current and loop
    const newCurrent = (current + 1) % facilities.length;
    setCurrent(newCurrent);
  };

  return (
    <section
      data-testid="facilities-section"
      className={"glassmorphic-lg w-full py-[120px]"}
    >
      <div className={"relative w-full space-y-6 px-4 md:px-0"}>
        <SectionTitle
          title={"Fasilitas di Masjid Raden Patah"}
          subtitle={"Yuk kita lihat fasilitas yang ada di Masjid Raden Patah"}
          className={"container w-full"}
        />
        <motion.div
          variants={parentVariant}
          initial={"hidden"}
          animate={"justifyBetween"}
          exit={"exit"}
          transition={{
            duration: 5,
            staggerChildren: 0.2,
            ease: "easeInOut",
            type: "tween",
          }}
          className={"relative flex h-fit min-h-20 min-w-[1536px] gap-12"}
        >
          {/* Children Starts Here */}
          {Array.from({ length: 5 }).map((_, i) => {
            const index =
              (current - 2 + (i + 1) + facilities.length) % facilities.length;
            const facility = facilities[index];
            return (
              <motion.div
                variants={childVariant}
                key={index}
                whileHover={{ scale: 1.05, transition: { duration: 0.01 } }}
                className="absolute flex h-fit w-1/5 min-w-[300px] flex-col items-center justify-center p-1 text-2xl font-bold text-white xl:p-4"
                transition={{ duration: 1 }}
                custom={{
                  index: i,
                  parentWidth,
                  numberItem: 5,
                }}
              >
                <FacilityCard {...facility}></FacilityCard>
              </motion.div>
            );
          })}

          <div className="pointer-events-none relative flex h-fit w-1/5 flex-col items-center justify-center p-1 text-2xl font-bold text-white opacity-0 xl:p-4">
            <FacilityCard
              {...facilities[0]}
              title={"Long Text Given Here Hahahaha"}
            />
          </div>
          {/* Children Ends Here */}
          <div
            className={
              "pointer-events-none absolute z-50 flex h-full w-screen justify-center p-8 2xl:container md:items-center lg:inset-0" +
              " items-end max-md:pb-0 md:justify-between 2xl:p-0"
            }
          >
            <button
              className={
                "pointer-events-auto relative h-fit rounded-lg bg-secondary p-4 text-primary shadow-xl hover:bg-white hover:text-primary" +
                " max-md:translate-y-[150%]" +
                " hover:text-white" +
                " active:bg-primary"
              }
              onClick={prev}
            >
              <ChevronLeft />
            </button>
            <button
              className={
                "pointer-events-auto relative h-fit rounded-lg bg-secondary p-4 text-primary shadow-xl hover:bg-white hover:text-primary" +
                " hover:text-white active:bg-primary max-md:translate-y-[150%]"
              }
              onClick={next}
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>

        <div
          className={
            "container z-50 mt-8 hidden w-full items-center justify-center gap-2 md:flex"
          }
        >
          {facilities.map((_, index) => {
            return (
              <button
                key={index}
                className={`size-4 ${index === current ? "bg-primary" : "bg-gray-400"} rounded-full hover:bg-secondary`}
                onClick={() => {
                  setCurrent(index);
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Facilities;
