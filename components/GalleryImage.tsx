"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const GalleryImageDecoration = ({
  className,
  chldrenClassName,
  variants,
  transition,
}: {
  className?: string;
  chldrenClassName?: string;
  variants: {
    hidden: Record<string, unknown>;
    visible: Record<string, unknown>;
  };
  transition: {
    duration?: number;
    delay?: number;
    [key: string]: unknown;
  };
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const mainAnimation = useAnimation();

  useEffect(() => {
    if (isInView) {
      //   Fire the animation
      mainAnimation.start("visible").then(() => {});
    }
  }, [isInView, mainAnimation]);

  const base = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Merge base animation with overridden variants
  const finalVariants = {
    hidden: { ...base.hidden, ...variants?.hidden },
    visible: { ...base.visible, ...variants?.visible },
  };

  const defaultTransition = { duration: 0.5, delay: 0.25 };

  return (
    <motion.div
      ref={ref}
      className={cn("flex h-full w-full overflow-hidden", className)}
    >
      <motion.div
        variants={finalVariants}
        initial={"hidden"}
        animate={mainAnimation}
        transition={{ ...defaultTransition, ...transition }}
        className={cn("h-full w-full bg-primary", chldrenClassName)}
      />
    </motion.div>
  );
};
