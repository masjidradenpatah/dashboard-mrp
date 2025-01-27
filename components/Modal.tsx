"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Modal = ({
  children,
  className,
  modalTitle,
  fullUrl,
}: {
  children: ReactNode;
  className?: string;
  modalTitle: string;
  fullUrl: string;
}) => {
  const router = useRouter();

  const [isGotoFull, setIsGotoFull] = useState<boolean>(false);

  function handleOpenChange() {
    router.back();
  }

  useEffect(() => {
    if (isGotoFull) router.push(fullUrl);
  }, [fullUrl, isGotoFull, router]);

  return (
    <Dialog
      open={!isGotoFull}
      defaultOpen={true}
      onOpenChange={handleOpenChange}
    >
      <DialogOverlay className={"glassmorphic-lg"}>
        <DialogContent className={cn("overflow-hidden", className)}>
          <DialogTitle className={"h-8"}>{modalTitle}</DialogTitle>
          {children}
          <Button
            variant={"outline"}
            onClick={() => setIsGotoFull(true)}
            className={"ms-auto mt-2"}
          >
            See full detail <Maximize2 />
          </Button>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
export default Modal;
