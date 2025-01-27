import {v4 as uuidv4 } from 'uuid'
import { prisma } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/VerificationToken";

export async function generateVerificationByEmail(email:string) {
  const generatedToken = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if(existingToken) {
    prisma.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const resultToken = await prisma.verificationToken.create({
    data:{
      email,
      token: generatedToken,
      expires
    }
  });


  return resultToken;
}