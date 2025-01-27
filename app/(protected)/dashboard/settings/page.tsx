import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const Page = () => {
  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader className={"flex w-full flex-row justify-between"}>
          <h2 className={"text-xl font-medium"}>Settings</h2>
        </CardHeader>
        <CardContent
          className={"flex flex-col justify-center space-y-4"}
        ></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
export default Page;
