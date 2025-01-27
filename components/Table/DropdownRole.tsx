import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { $Enums } from "@prisma/client";
import UserRole = $Enums.UserRole;
import { cn, mapEnum } from "@/lib/utils";
import { updateUserRole } from "@/actions/user";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserRoleBadge from "@/components/UserRoleBadge";

interface Props {
  role: UserRole;
  userId: string;
}

export function getRoleBgColor(role: UserRole): string {
  switch (role) {
    case "ADMIN":
      return "bg-rose-400/50 hover:bg-rose-400/75 active:bg-rose-400";
    case "DC":
      return "bg-fuchsia-400/50 hover:bg-fuchsia-400/75 active:bg-fuchsia-400";
    case "PTQ":
      return "bg-emerald-400/50 hover:bg-emerald-400/75 active:bg-emerald-400";
    case "UMAR":
      return "bg-sky-400/50 hover:bg-sky-400/75 active:bg-sky-400";
    case "IMC":
      return "bg-violet-400/50 hover:bg-violet-400/75 active:bg-violet-400";
    case "TAKMIR":
      return "bg-yellow-400/50 hover:bg-yellow-400/75 active:bg-yellow-400";
    case "JAMAAH":
      return "bg-rose-400/50 hover:bg-rose-400/75 active:bg-rose-400";
  }
}

const DropdownRole = ({ role, userId }: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (variables: { id: string; newData: UserRole }) =>
      updateUserRole(variables.id, variables.newData),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Success updating user role",
      });
      // @ts-expect-error i dont know
      queryClient.invalidateQueries(["user roles"]).then(() => {});
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed on updating user role",
        variant: "destructive",
      });
    },
  });

  function handleUpdate(newData: UserRole) {
    mutation.mutate({ id: userId, newData });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"flex size-full h-[52px]"}>
        <Button
          asChild
          variant="ghost"
          className={cn("flex h-full w-full grow justify-center p-0")}
        >
          <UserRoleBadge role={role}></UserRoleBadge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={"space-y-2"}>
        <DropdownMenuLabel>Roles</DropdownMenuLabel>
        {mapEnum(UserRole, (key) => (
          <DropdownMenuItem
            className={"size-full bg-none p-0"}
            key={key}
            onClick={() => {
              handleUpdate(key);
            }}
          >
            <UserRoleBadge role={key} className={"!size-full"} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownRole;
