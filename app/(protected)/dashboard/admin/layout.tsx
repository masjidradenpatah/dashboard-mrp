import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  const user = session?.user as User;
  if (!(user.role === "ADMIN")) return redirect("/");
  return children;
};
export default Layout;
