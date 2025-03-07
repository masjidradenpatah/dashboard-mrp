import ImageKit from 'imagekit'
import config from "@/lib/config";

console.log('hello');
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;
export const imageKit = new ImageKit({
  privateKey: config.env.imageKit.privateKey,
  publicKey: config.env.imageKit.publicKey,
  urlEndpoint: `https://ik.imagekit.io/arzitech/`
})