import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { DataTable } from "@/components/Table/TableData";
import {
  deleteManyArticlesByID,
  getUserArticle,
} from "@/actions/articleAction";
import { columns } from "@/app/(protected)/dashboard/articles/articles-column";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Article } from "@prisma/client";
import { ActionResponse } from "@/types";

const Page = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  const userId: string = session.user.id;

  return (
    <div className={"size-full pt-12"}>
      <Card>
        <CardHeader className={"flex w-full flex-row justify-between"}>
          <h2 className={"text-xl font-medium"}>Manage Article</h2>
          <Button asChild>
            <Link
              className={"relative ms-auto w-fit"}
              href={"/dashboard/articles/new-article"}
            >
              Create New Article <CirclePlus />{" "}
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            queryKey={`${userId} article`}
            queryAction={async (): Promise<ActionResponse<Article[]>> => {
              "use server";
              return await getUserArticle(userId);
            }}
            columns={columns}
            filterBy={"title"}
            deleteFNAction={deleteManyArticlesByID}
          ></DataTable>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
