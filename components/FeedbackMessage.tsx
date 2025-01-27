import { TriangleAlert } from "lucide-react";
import React from "react";

export const FeedbackMessage = ({
  message,
  type,
}: {
  message: string;
  type: "error" | "success" | "loading";
}) => {
  const messageStyles = {
    error: "bg-red-400/25 text-red-600",
    success: "bg-emerald-400/25 text-emerald-600",
    loading: "text-muted-foreground",
  };

  return (
    <div
      className={`flex w-full items-center justify-center gap-2 rounded-sm py-3 text-center tracking-wide ${
        messageStyles[type]
      }`}
    >
      {type === "error" && <TriangleAlert className="stroke-1" />}
      {message}
    </div>
  );
};
