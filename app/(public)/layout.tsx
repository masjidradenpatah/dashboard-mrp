import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <>
      <Navbar isLoggedIn={!!session} username={session?.user.name} />
      <main className={"w-full"}>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
