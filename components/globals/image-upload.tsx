import React, { useRef, useState } from "react";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
import { toast } from "@/hooks/use-toast";
import {
  IKUploadResponse
} from "imagekitio-next/src/components/IKUpload/props";
import { Button } from "@/components/ui/button";
import { Delete, Images, Trash2 } from "lucide-react";
import { deleteImage } from "@/actions/deleteImageAction";
import { Progress } from "@/components/ui/progress"
import { ImageFolder } from "@/lib/image-folder";
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

const ImageUpload = ({ onFileChange, folder, defaultImage }: {
    onFileChange: (fileId: string|null) => void;
    folder: ImageFolder,
    defaultImage?: {filePath:string, fileId:string}
  }) => {
  const [progress, setProgress] = useState<number>(0)
  const ikUploadRef = useRef(null);

  const [file, setFile] = useState<{ filePath: string, fileId: string } | null>(defaultImage ? { fileId: defaultImage.fileId, filePath: defaultImage.filePath } : null);

  const onUploadStart = () => {setProgress(0)}
  const onUploadEnd = () => {setProgress(0)}

  const onError = () => {
    toast({
      title: "Failed",
      description: "Your image couldn't be uploaded",
      variant: "destructive"
    });
    onUploadEnd();
  };

  const onSuccess = (res: IKUploadResponse) => {
    const filePath: string = res.filePath;
    const fileId = res.fileId
    setFile({ filePath, fileId });
    onFileChange(fileId);
    onUploadEnd()
  };

  const onDeleteImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(file?.fileId) {
      await deleteImage(file.fileId);
    }

    setFile(null)
    onFileChange(null)
    setProgress(0)
  }

  // Handle upload progress
  const onUploadProgress = (progressEvent: ProgressEvent<XMLHttpRequestEventTarget>) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    setProgress(percentCompleted); // Update progress state
  };

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
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        folder={folder}
      />

      {progress > 0  ? (
        <div className={'relative max-w-96 mx-auto flex justify-center' +
          ' flex-col items-center gap-2'}>
          <p>Uploading...</p>
          <Progress value={progress} />
          <p>{progress}%</p>
        </div>
      ) : (
        <>
          {file ? (
            <div className={'relative w-full'}>
              <div
                className={
                  'size-96 border rounded-md mx-auto relative overflow-hidden'
                }
              >
                <IKImage
                  alt={file.filePath}
                  path={file.filePath}
                  width={500}
                  height={500}
                  className={
                    'mx-auto relative w-full border rounded-md overflow-hidden'
                  }
                />
                <Button
                  onClick={onDeleteImage}
                  className={
                    'size-12 absolute rounded-md right-0 bottom-0 bg-destructive grid place-content-center'
                  }
                >
                  <Trash2 className={'text-white'} />
                </Button>
              </div>
            </div>
          ) : (
            <div className={'flex flex-col gap-2 text-sm font-medium'}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (ikUploadRef.current) {
                    // @ts-expect-error This is safe
                    ikUploadRef.current.click();
                  }
                }}
                disabled={progress > 0}
                className={
                  'border-lg flex items-center rounded-md justify-center gap-2 border py-4 text-sm hover:bg-gray-100 active:bg-gray-200'
                }
              >
                <Images className={'text-gray-400'} />
                <span>Upload article cover</span>
              </button>
            </div>
          )}
        </>
      )}
    </ImageKitProvider>

  );
};
export default ImageUpload;
