import React, { forwardRef } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { SignOutAction } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

const SignOutButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "destructive", ...props }, ref) => {
    return (
      <form action={SignOutAction} className={"w-full"}>
        <Button
          type="submit"
          ref={ref}
          className={cn(className)}
          variant={variant}
          {...props}
        >
          Sign Out <LogOut className={"stroke-2"} />
        </Button>
      </form>
    );
  },
);

SignOutButton.displayName = "SignOutButton";

export default SignOutButton;
