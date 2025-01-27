import { getPlaiceholder } from "plaiceholder";
import { ImageProps } from "next/image";

export async function getBase64(url: string) {
  try {
    if (url === "") {
      return null;
    }

    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }

    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch {
    return null;
  }
}

export async function addBlurredDataUrls(
  images: ImageProps[],
): Promise<ImageProps[]> {
  const base64Promises = images.map((image) => getBase64(image.src as string));
  const base64Results = await Promise.all(base64Promises);
  return images.map((image, i) => {
    return {
      ...image,
      blurDataURL: base64Results[i],
    } as ImageProps;
  });
}
