'use server';

import ImageKit from 'imagekit'
import config from "@/lib/config";

const imageKit = new ImageKit({
  privateKey: config.env.imageKit.privateKey,
  publicKey: config.env.imageKit.publicKey,
  urlEndpoint: `https://ik.imagekit.io/arzitech/`
})

const imageKitAPIKey = process.env.IMAGEKIT_PRIVATE_KEY!;

export async function deleteImage(fileId: string) {
  imageKit.deleteFile(fileId, function(error, result) {
    if(error) console.log(error);
    else console.log(result);
  });
}

export async function getImagePathById(fileId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    imageKit.getFileDetails(fileId, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        const path = result?.filePath || '';
        console.log({ path });
        resolve(path);
      }
    });
  });
}