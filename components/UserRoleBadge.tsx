import React from "react";
import { cn } from "@/lib/utils";

export const ROLE_COLOR: Record<string, string> = {
  ADMIN: "bg-rose-500 text-white",
  DC: "bg-orange-500 text-white",
  IMC: "bg-green-500 text-white",
  PTQ: "bg-blue-500 text-white",
  UMAR: "bg-violet-500 text-white",
  TAKMIR: "bg-primary text-white",
  JAMAAH: "bg-yellow-500 text-white",
};

const UserRoleBadge = ({
  role,
  className,
}: {
  role: "ADMIN" | "DC" | "IMC" | "PTQ" | "UMAR" | "TAKMIR" | "JAMAAH"; // Membatasi nilai role
  className?: string; // className bisa undefined
}) => {
  const roleColor = ROLE_COLOR[role] || "bg-gray"; // Fallback ke warna default jika role tidak ditemukan

  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-md px-2 py-1 text-sm font-medium text-black", // Style default
        roleColor, // Warna berdasarkan role
        className, // Tambahan className dari props
      )}
    >
      {role}
    </span>
  );
};
export default UserRoleBadge;
