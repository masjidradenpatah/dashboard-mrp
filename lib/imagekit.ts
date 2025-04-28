import ImageKit from 'imagekit'
import config from "@/lib/config";

console.log('hello');
export const imageKit = new ImageKit({
  privateKey: config.env.imageKit.privateKey,
  publicKey: config.env.imageKit.publicKey,
  urlEndpoint: `https://ik.imagekit.io/arzitech/`
})