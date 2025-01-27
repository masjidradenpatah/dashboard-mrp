import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DropdownEnumProps<T extends string> {
  currentValue: T; // Nilai saat ini dari enum
  enumValues: Record<T, string>; // Enum (key-value)
  getBgColor: (key: T) => string; // Fungsi untuk mendapatkan warna background
  onUpdate: (key: T) => Promise<void>; // Fungsi untuk pembaruan nilai
  label: string; // Label untuk dropdown (contoh: "Roles")
  isDisabled?: boolean; // Opsional: Apakah tombol harus dinonaktifkan
}

function DropdownEnum<T extends string>({
  currentValue,
  enumValues,
  getBgColor,
  onUpdate,
  label,
  isDisabled = false,
}: DropdownEnumProps<T>) {
  const queryClient = useQueryClient();

  // Inisialisasi mutasi
  const mutation = useMutation({
    mutationFn: (newValue: T) => onUpdate(newValue),
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Successfully updated ${label.toLowerCase()}`,
      });
      // @ts-expect-error i dont know
      queryClient.invalidateQueries([label.toLowerCase()]); // Invalidasi query terkait
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to update ${label.toLowerCase()}`,
        variant: "destructive",
      });
    },
  });

  const handleUpdate = (key: T) => {
    mutation.mutate(key);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "!size-full grow justify-center p-0 py-4 text-black",
            getBgColor(currentValue),
          )}
          disabled={isDisabled}
        >
          {enumValues[currentValue]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={"space-y-2"}>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {Object.entries(enumValues).map(([key]) => (
          <DropdownMenuItem
            key={key}
            className={getBgColor(key as T)}
            onClick={() => handleUpdate(key as T)}
            disabled={mutation.isPending}
          >
            {key}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownEnum;
