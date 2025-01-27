"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelsTopLeft } from "lucide-react";

export function SidebarTriggerButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <button onClick={toggleSidebar}>
      <PanelsTopLeft />
    </button>
  );
}
