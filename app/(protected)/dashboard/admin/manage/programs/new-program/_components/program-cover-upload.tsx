import React, { useRef, useState } from "react";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
import { toast } from "@/hooks/use-toast";
import {
  IKUploadResponse
} from "imagekitio-next/src/components/IKUpload/props";
import { Button } from "@/components/ui/button";
import { Delete, Images } from "lucide-react";
import {imageKit} from '@/lib/imagekit'
import { deleteImage } from "@/actions/deleteImageAction";

const { publicKey, urlEndpoint } = config.env.imageKit;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.appUrl}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
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

const ProgramCoverUpload = (
  {
    onFileChange
  }: {
    onFileChange: (filepath: string|null) => void;
  }) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string, fileId: string } | null>(null);
  const onError = () => {
    toast({
      title: "Failed",
      description: "Your image couldn't be uploaded",
      variant: "destructive"
    });
  };
  const onSuccess = (res: IKUploadResponse) => {
    const filePath: string = res.filePath;
    const fileId = res.fileId
    setFile({ filePath, fileId });
    onFileChange(filePath);
    console.log(filePath, fileId);
  };
  const onDeleteImage = async () => {
    if(file?.fileId) {
      await deleteImage(file.fileId);
    }

    setFile(null)
    onFileChange(null)

  }
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        className={"hidden"}
        onError={onError}
        onSuccess={onSuccess}
        folder={'/folder'}
      />

      {file ? (
        <div className={'relative'}>
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={500}
          />
          <Button
            onClick={onDeleteImage}
            className={'size-12 absolute rounded-md right-0 bottom-0 bg-destructive grid place-content-center'}>
            <Delete className={'text-white '} />
          </Button>
        </div>
      ): (
        <div className={"col-span-3 !mt-0 flex flex-col gap-2 text-sm" +
          " font-medium"}>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (ikUploadRef.current) {
                // @ts-expect-error This is save
                ikUploadRef.current.click();
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
      )}
    </ImageKitProvider>

  );
};
export default ProgramCoverUpload;
