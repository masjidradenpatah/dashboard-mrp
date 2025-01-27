"use client";

import { ColumnDef } from "@tanstack/table-core";
import { User } from "@prisma/client";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/Table/TableHeaderSortable";
import DropdownRole from "@/components/Table/DropdownRole";

import { deleteManyUserByID } from "@/actions/user";
import {
  moreActionColumn,
  numberColumn,
  selectColumn,
} from "@/components/Table/TableData";

type UserColumn = User;

export const columns: ColumnDef<UserColumn>[] = [
  selectColumn<UserColumn>(),
  numberColumn<UserColumn>(),
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"name"} />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"email"} />
    ),
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"email verified at"} />
    ),
    cell: ({ row }) => {
      const emailVerifiedAt = row.original.emailVerified;
      let statusColor = "bg-emerald-400";
      if (emailVerifiedAt == null) statusColor = "bg-destructive/50";

      return (
        <div
          className={cn(
            "flex items-center justify-center rounded-md bg-secondary px-2 py-4",
            statusColor,
          )}
        >
          {!emailVerifiedAt
            ? "Not Verified"
            : new Date(row.getValue("emailVerified")).toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"role"} />
    ),
    cell: ({ row }) => {
      const role = row.original.role;
      const userId = row.original.id;
      return <DropdownRole role={role} userId={userId}></DropdownRole>;
    },
  },
  moreActionColumn<UserColumn>({
    deleteFNAction: deleteManyUserByID,
  }),
];
