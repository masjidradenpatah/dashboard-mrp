"use server";

import z from "zod";
import bcrypt from "bcryptjs";
import {
  signUpSchema,
  signInSchema,
  resetPasswordSchema,
  newPasswordSchema,
} from "@/schemas/authSchemas";
import { getUserByEmail } from "@/data/User";
import { prisma } from "@/lib/db";
// import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getVerificationTokenByToken } from "@/data/VerificationToken";
import { getResetPasswordTokenByToken } from "@/data/ResetPasswordToken";
import { signIn, signOut } from "@/auth";

export const signInAction = async (
  values: z.infer<typeof signInSchema>,
): Promise<Record<string, string>> => {
  const validatedFields = signInSchema.safeParse(values);

  // signIn Action Test 01
  if (!validatedFields.success) {
    return { error: "Something went wrong" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User not found" };
  }

  // if (!existingUser.emailVerified) {
  //   const verificationToken = await generateVerificationByEmail(
  //     existingUser.email,
  //   );
  //   await sendVerificationEmail(
  //     verificationToken.email,
  //     verificationToken.token,
  //   );
  //   return {
  //     success:
  //       "Please verify your email. We've send the verfication link to your email",
  //   };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }

  return { success: "SignIn Succces Welcome Back" };
};

export const signUpAction = async (
  values: z.infer<typeof signUpSchema>,
): Promise<Record<string, string>> => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Something went wrong" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existinguser = await getUserByEmail(email);

  if (existinguser) {
    return { error: "Email already used" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // const verificationToken = await generateVerificationByEmail(email);
  // await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: `Congratulations!!! Your Account has successfully created.`,
  };
};

export async function SignOutAction() {
  await signOut();
}

export async function verifyEmail(
  token: string,
): Promise<Record<string, string>> {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Token Doesn't exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token Has Expires" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email doesn't exist" };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      email: existingToken.email,
      emailVerified: new Date(),
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Success verifying your email" };
}

export async function resetPasswordAction(
  values: z.infer<typeof resetPasswordSchema>,
): Promise<Record<string, string>> {
  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Something went wrong" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { error: "Email doesn't exit" };
  }

  // try {
  // TODO: Handle if sending email failed
  // await sendResetPasswordEmail(token.email, token.token);
  // } catch {
  //   return { error: "Failed to sending reset password link to email" };
  // }

  // await generateResetPasswordTokenByEmail(existingUser.email);
  await prisma.resetPasswordRequest.create({
    data: {
      email: email,
      date: new Date(),
    },
  });
  return {
    success:
      "Reset password request has already created. Please wait our team to process.",
  };
}

export async function newPasswordAction(
  values: z.infer<typeof newPasswordSchema>,
  token: string,
): Promise<Record<string, string>> {
  //  TODO!!!!!!!!!!!!
  const validatedFields = newPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Credentials" };
  }

  const { password } = validatedFields.data;
  const existingToken = await getResetPasswordTokenByToken(token);
  if (!existingToken) {
    return { error: "Token Doesn't exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email Doesn't exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.resetPasswordToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Successfully changing to new password" };
}
