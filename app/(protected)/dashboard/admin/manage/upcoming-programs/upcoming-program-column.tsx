"use client";

import { ColumnDef } from "@tanstack/table-core";
import { ProgramExecution } from "@prisma/client";
import { DataTableColumnHeader } from "@/components/Table/TableHeaderSortable";
import { DropdownUpcomingProgramStatus } from "@/components/DropdownUpcomingProgramStatus";
import {
  moreActionColumn,
  numberColumn,
  selectColumn,
} from "@/components/Table/TableData";
import { deleteManyUpcomingProgramByID } from "@/actions/programActions";

export const columns: ColumnDef<ProgramExecution>[] = [
  selectColumn<ProgramExecution>(),
  numberColumn<ProgramExecution>(),
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"date"} />
    ),
    cell: ({ row }) => <div>{row.original.date.toLocaleString()}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        isSortable={false}
        title={"status"}
      />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const userId = row.original.id;
      return (
        <DropdownUpcomingProgramStatus
          status={status}
          userId={userId}
        ></DropdownUpcomingProgramStatus>
      );
    },
  },

  moreActionColumn<ProgramExecution>({
    deleteFNAction: deleteManyUpcomingProgramByID,
  }),
];
