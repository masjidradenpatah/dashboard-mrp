"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "@/components/ui/button";
import googleIcon from "@/public/icons/google-color.svg";
import Image from "next/image";

const GoogleSignIn = () => {
  async function onClick() {
    await signIn("google", {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  }
  return (
    <Button
      className={"aspect-square size-fit rounded-lg bg-white p-4 shadow-xl"}
      onClick={onClick}
    >
      <Image
        width={24}
        height={24}
        className={"shrin object-contain"}
        src={googleIcon}
        alt={"google"}
      />
    </Button>
  );
};
export default GoogleSignIn;
