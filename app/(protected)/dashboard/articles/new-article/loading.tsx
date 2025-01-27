import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader className={"flex w-full flex-row justify-between"}>
          <h2 className={"text-xl font-medium"}>Membuat Artikel Baru</h2>
        </CardHeader>
        <CardContent>
          <span>Loading </span>
          <LoaderCircle className={"animate-spin"}></LoaderCircle>
        </CardContent>
      </Card>
    </div>
  );
};
export default Loading;
