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
    const response = await fetch(`http://localhost:3000/api/auth/imagekit`);
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

const ImageUploadDropzone = ({
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
    toast({
      title: "Success",
      description: "Your has been uploaded",
    });
    setFile(res);
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
      />
      <div className="flex w-full items-center justify-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (ikUplaodRef.current) {
              // @ts-expect-error This is save
              ikUplaodRef.current.click();
            }
          }}
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <Images className={"text-gray-600"}></Images>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
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
export default ImageUploadDropzone;
