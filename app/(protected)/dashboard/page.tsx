import React from "react";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import UserRoleBadge from "@/components/UserRoleBadge";

const Page = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <div className={"flex size-full gap-12 pt-12"}>
      <Card className={"w-full max-w-prose"}>
        <CardHeader className={"flex w-full flex-row justify-between"}>
          <h2 className={"text-xl font-medium"}>Profile</h2>
        </CardHeader>
        <CardContent className={"flex flex-col justify-center space-y-4"}>
          <div className={"mb-4 size-48 rounded-full bg-secondary"}></div>
          <div className={"flex w-full justify-between"}>
            <div className={"w-full text-start lg:w-1/2"}>
              <p className={"text-muted-foreground"}>Profile name</p>
              <p className={"text-lg"}>{user.name}</p>
            </div>
            <UserRoleBadge className={"w-24"} role={user.role}></UserRoleBadge>
          </div>
          <div className={"w-full text-start lg:w-1/2"}>
            <p className={"text-muted-foreground"}>Username</p>
            <p className={"text-lg"}>
              {user.username ? <>{user.username}</> : <>Belum di masukkan</>}
            </p>
          </div>
          <div className={"w-full text-start lg:w-1/2"}>
            <p className={"text-muted-foreground"}>Jenis Kelamin</p>
            <p className={"text-lg"}>
              {user.gender ? <>{user.gender}</> : <>Belum di masukkan</>}
            </p>
          </div>
          <div className={"w-full text-start lg:w-1/2"}>
            <p className={"text-muted-foreground"}>Email</p>
            <p className={"text-lg"}>{user.email}</p>
          </div>
          <div className={"w-full text-start lg:w-1/2"}>
            <p className={"text-muted-foreground"}>Bio</p>
            <p className={"text-lg"}>
              {user.bio ? <>{user.bio}</> : <>Tambahkan bio</>}
            </p>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      {/*<Card>*/}
      {/*  <CardContent>Hello</CardContent>*/}
      {/*</Card>*/}
    </div>
  );
};
export default Page;
