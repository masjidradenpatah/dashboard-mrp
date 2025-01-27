"use client";
import React, { ReactNode } from "react";
import { IKImage, ImageKitProvider as ImageKit } from "imagekitio-next";
import config from "@/lib/config";
import { ImageProps } from "next/image";
import IKImageProps from "imagekitio-next/src/components/IKImage/props";
import ImageKitProviderProps from "imagekitio-next/src/components/ImageKitProvider/props";

const urlEndpoint = config.env.imageKit.urlEndpoint;

export const ImageKitProvider = ({ children }: { children: ReactNode }) => {
  return <ImageKit urlEndpoint={urlEndpoint}>{children}</ImageKit>;
};

interface ImageKitImageProps {
  path: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}

export const ImageKitImage = (
  props: Omit<ImageProps, "src" | "loading" | "loader"> &
    IKImageProps &
    ImageKitProviderProps &
    ImageKitImageProps,
) => <IKImage {...props} className={props.className} />;
