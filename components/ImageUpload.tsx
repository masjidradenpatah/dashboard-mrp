"use client";
import React, { useRef, useState } from "react";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";

import { toast } from "@/hooks/use-toast";
import { Images } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/src/components/IKUpload/props";

const { publicKey, urlEndpoint } = config.env.imageKit;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.appUrl}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    // @ts-expect-error safe
    throw new Error(`Authenticator request failed. ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filepath: string) => void;
}) => {
  const ikUplaodRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const onError = () => {
    toast({
      title: "Failed",
      description: "Your image couldn't be uploaded",
      variant: "destructive",
    });
  };
  const onSuccess = (res: IKUploadResponse) => {
    const filePath: string = res.filePath;
    setFile({ filePath });
    onFileChange(res.filePath);
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUplaodRef}
        className={"hidden"}
        onError={onError}
        onSuccess={onSuccess}
      ></IKUpload>

      <div className={"flex flex-col gap-2 text-sm font-medium"}>
        <p>Image cover</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (ikUplaodRef.current) {
              // @ts-expect-error This is save
              ikUplaodRef.current.click();
            }
          }}
          className={
            "border-lg flex items-center justify-center gap-2 border py-2 text-sm"
          }
        >
          <Images className={"text-gray-400"}></Images>
          <span>Upload article cover</span>
        </button>
      </div>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        ></IKImage>
      )}
    </ImageKitProvider>
  );
};
export default ImageUpload;
