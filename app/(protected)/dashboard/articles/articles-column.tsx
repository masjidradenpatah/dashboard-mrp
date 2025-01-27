"use client";

import { ColumnDef } from "@tanstack/table-core";

import { Article } from "@prisma/client";
import { convert } from "html-to-text";
import { DataTableColumnHeader } from "@/components/Table/TableHeaderSortable";
import {
  moreActionColumn,
  numberColumn,
  selectColumn,
} from "@/components/Table/TableData";
import { deleteManyArticlesByID } from "@/actions/articleAction";
import DropdownArticleStatus from "@/components/Table/DropdownArticleStatus";

export const columns: ColumnDef<Article>[] = [
  selectColumn<Article>(),
  numberColumn<Article>(),
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"title"} />
    ),
  },
  {
    accessorKey: "content",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSortable={false}
        title={"content"}
      />
    ),
    cell: ({ row }) => {
      const content = row.original.content;
      const text = convert(content, { wordwrap: 130 });
      return <div>{text}</div>;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"status"} />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <DropdownArticleStatus
          status={status}
          articleId={row.original.id}
        ></DropdownArticleStatus>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"category"} />
    ),
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "totalView",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"views"} />
    ),
    cell: ({ row }) => (
      <div className={"flex w-full justify-center"}>
        {row.getValue("totalView") || 0}
      </div>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSortable={false}
        title={"slug"}
      />
    ),
    cell: ({ row }) => (
      <div className={"max-w-[100px] overflow-hidden"}>
        {row.getValue("slug")}
      </div>
    ),
  },
  moreActionColumn<Article>({
    editFNAction: true,
    deleteFNAction: deleteManyArticlesByID,
  }),
];
