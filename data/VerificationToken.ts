import { prisma } from "@/lib/db";

export async function getVerificationTokenByEmail(email: string) {
  const token = await prisma.verificationToken.findFirst({
    where: {
      email
    }
  });
  return token;
}

export async function getVerificationTokenByToken(token: string) {
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