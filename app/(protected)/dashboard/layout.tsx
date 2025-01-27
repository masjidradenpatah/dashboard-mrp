import React, { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SidebarTriggerButton } from "@/components/SidebarTriggerButton";
import { DynamicBreadcrumb } from "@/components/DynamicCollapsibleBreadcrumb";
import { House } from "lucide-react";
import Link from "next/link";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) return redirect("/signIn");

  return (
    <SidebarProvider className={"flex size-full"}>
      <div className={"w-fit"}>
        <DashboardSidebar user={session.user} />
        {/*<div className={"w-full bg-blue-700/50"}></div>*/}
      </div>
      <div
        className={
          "max-w-[calc(100vw -255px)] flex size-full flex-col overflow-x-hidden"
        }
      >
        <div
          className={"fixed z-50 flex w-full items-center gap-4 bg-sidebar p-4"}
        >
          <SidebarTriggerButton />
          <Link href={"/"}>
            <House></House>
          </Link>
          <DynamicBreadcrumb />
        </div>
        <div className={"mt-16 max-w-full p-12 pt-0"}>{children}</div>
      </div>
    </SidebarProvider>
  );
};
export default Layout;
