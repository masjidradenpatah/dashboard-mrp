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
import {
  deleteManyUpcomingProgramByID,
  getFirstUpcomingProgram, updateManyUpcomingProgram
} from "@/actions/programActions";
import { getFormattedDate } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "@/hooks/use-toast";

export const columns: ColumnDef<ProgramExecution>[] = [
  selectColumn<ProgramExecution>(),
  numberColumn<ProgramExecution>(),
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"title"} />
    ),
    cell: ({ row }) => <div>{row.original.title }</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"date"} />
    ),
    cell: ({ row }) => <div>{row.original.date ? getFormattedDate(row.original.date) : "Coming Soon" }</div>,
  },
  {
    accessorKey: "showOrder",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"show order"} />
    ),
    cell: ({ row }) => <div>{row.original.showOrder ? row.original.showOrder : "not shown" }</div>,
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
    Render: (itemId, row) => {
      // eslint-disable react-hook/rules-of-hooks
      // ts-expect-error fine
      const [, startTransition] = useTransition()
      return (
        <>
          <DropdownMenuItem className={"p-0 px-2"} asChild>
            <Button
              variant="ghost"
              size="sm"
              disabled={row?.original.showOrder !== null}
              onClick={()=>{
                startTransition(async ()=>{
                  const response = await getFirstUpcomingProgram()
                  if(response.status === "SUCCESS" && response.data) {
                    const lastItem = response.data.at(-1);
                    const lastItemOrder:number = lastItem?.showOrder ??  0;


                    if(lastItemOrder >= 3) {
                      toast({
                        title: "Failed",
                        variant: "destructive",
                        description: "Maximum upcoming program"
                      })
                      return;
                    }

                    await updateManyUpcomingProgram([{id: itemId, data: {showOrder: lastItemOrder + 1 } }])
                    toast({
                      title: "Success",
                      description: "Upcoming program has been added"
                    })
                  }
                })
              }}
            >
                Show Program
                <Eye />
            </Button>
          </DropdownMenuItem>
        </>
      )
    }
  }),
];
