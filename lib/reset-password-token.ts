import {v4 as uuidv4 } from 'uuid'
import { prisma } from "@/lib/db";

import { getResetPasswordTokenByEmail } from "@/data/ResetPasswordToken";

export async function generateResetPasswordTokenByEmail(email:string) {
  const generatedToken = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getResetPasswordTokenByEmail(email);
  if(existingToken) {
    prisma.resetPasswordToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const resultToken = await prisma.resetPasswordToken.create({
    data:{
      email,
      token: generatedToken,
      expires
    }
  });

  return resultToken;
}