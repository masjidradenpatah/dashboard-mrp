import { prisma } from "@/lib/db";

export async function getResetPasswordTokenByEmail(email : string)  {
  try {
    const result = await prisma.verificationToken.findFirst({
      where: {
        email
      }
    });
    //
    return result;
  } catch {
    return null;
  }
}

export async function getResetPasswordTokenByToken(token : string)  {
  try {
    const result = await prisma.verificationToken.findUnique({
      where: {
        token
      }
    });
    //
    return result;
  } catch {
    return null;
  }
}