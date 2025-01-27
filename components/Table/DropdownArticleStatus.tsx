import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { ArticleStatus } from "@prisma/client";
import { cn, mapEnum } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArticleStatusById } from "@/actions/articleAction";

interface Props {
  status: ArticleStatus;
  articleId: string;
}

export function getArticleStatusBgColor(status: ArticleStatus): string {
  switch (status) {
    case "ARCHIVED":
      return "bg-gray-200/50 hover:bg-gray-200/75 active:bg-gray-200";
    case "DRAFT":
      return "bg-secondary/50 hover:bg-secondary/75 active:bg-secondary";
    case "PUBLISHED":
      return "bg-primary hover:bg-primary/75 active:bg-primary text-white";
    // case "UMAR":
    //   return "bg-sky-400/50 hover:bg-sky-400/75 active:bg-sky-400";
    // case "IMC":
    //   return "bg-violet-400/50 hover:bg-violet-400/75 active:bg-violet-400";
    // case "TAKMIR":
    //   return "bg-yellow-400/50 hover:bg-yellow-400/75 active:bg-yellow-400";
    // case "JAMAAH":
    //   return "bg-rose-400/50 hover:bg-rose-400/75 active:bg-rose-400";
  }
}

const DropdownRole = ({ status, articleId }: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (variables: { id: string; newData: ArticleStatus }) =>
      updateArticleStatusById(variables.id, variables.newData),
    onSuccess: ({ success }) => {
      toast({
        title: "Success",
        description: success,
      });
      // @ts-expect-error i dont know
      queryClient.invalidateQueries(["article status"]).then(() => {});
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed on updating user role",
        variant: "destructive",
      });
    },
  });

  function handleUpdate(newStatus: ArticleStatus) {
    mutation.mutate({ id: articleId, newData: newStatus });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "!size-full grow justify-center p-0 px-2 py-4 font-medium tracking-wider text-black",
            getArticleStatusBgColor(status),
          )}
        >
          {status}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={"space-y-2"}>
        <DropdownMenuLabel>Roles</DropdownMenuLabel>
        {mapEnum(ArticleStatus, (key, value) => (
          <DropdownMenuItem
            key={key}
            className={getArticleStatusBgColor(key)}
            onClick={() => {
              handleUpdate(key);
            }}
          >
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownRole;
