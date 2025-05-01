import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className={"flex size-full gap-12 pt-12"}>
      <Card className={"w-full max-w-prose"}>
        <CardHeader className={"flex w-full flex-row justify-between"}>
        </CardHeader>
        <CardContent className={"flex flex-col justify-center space-y-4"}>
          <Loader className={'animate-spin'} ></Loader>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      {/*<Card>*/}
      {/*  <CardContent>Hello</CardContent>*/}
      {/*</Card>*/}
    </div>
  );
};
export default Loading;
