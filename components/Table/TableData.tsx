"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { LoaderCircle, MoreHorizontal, SquarePen, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/Table/TableHeaderSortable";
import { ActionResponse } from "@/types";
import Link from "next/link";

interface TableData<TData, TValue> {
  queryKey: string;
  queryAction: () => Promise<ActionResponse<TData[]>>;
  columns: ColumnDef<TData, TValue>[];
  filterBy: string;
  editFNAction?: (id: string) => void;
  deleteFNAction: (ids: string[]) => Promise<ActionResponse<TData>>;
}

export function selectColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }) => (
      <div className={"grid w-12 place-content-center"}>
        <Checkbox
          className={""}
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(value)
          }
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className={"grid w-12 place-content-center"}>
        <Checkbox
          className={"max-w-[100px]"}
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

export function numberColumn<TData>(): ColumnDef<TData> {
  return {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader
        className={"max-w-8"}
        column={column}
        title={"no"}
      />
    ),
    cell: ({ row, table }) => (
      <div className={"flex max-w-8 justify-center"}>
        {table.getRowModel().rows.indexOf(row) + 1}
      </div>
    ),
  };
}
export function moreActionColumn<TData>({
  editFNAction,
  deleteFNAction,
}: {
  editFNAction?: boolean;
  deleteFNAction?: (ids: string[]) => Promise<ActionResponse<never>>;
}): ColumnDef<TData> {
  return {
    id: "actions",
    header: () => <div className="max-w-16 text-center">More actions</div>,
    cell: ({ row }) => {
      // @ts-expect-error the id should always there, typescript just doesn't know*/
      const itemId = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="size-8 w-full max-w-16 justify-center p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={"space-y-2"}>
            {editFNAction ? (
              <DropdownMenuItem className={"p-0"} asChild>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/articles/edit-article/${itemId}`}>
                    Edit
                    <SquarePen />
                  </Link>
                </Button>
              </DropdownMenuItem>
            ) : null}
            {deleteFNAction ? (
              <DropdownMenuItem className={"p-0"} asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className={"w-full"}
                    >
                      Delete
                      <Trash />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" className={"w-1/2"}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          deleteFNAction([itemId]).then((response) => {
                            if (response.error) {
                              toast({
                                title: "Error",
                                description: response.error,
                                variant: "destructive",
                              });
                            } else if (response.success) {
                              toast({
                                title: "Success",
                                description: response.success,
                              });
                            }
                          });
                        }}
                        className={"w-1/2"}
                      >
                        Delete Anyway
                        <Trash />
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
}

export function DataTable<TData, TValue>({
  queryKey,
  queryAction,
  columns,
  filterBy,
  deleteFNAction,
}: TableData<TData, TValue>) {
  const { data, isFetching } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => queryAction(),
    initialData: { status: "PENDING" },
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: data.data || [],
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className={"flex justify-between"}>
        <div className="flex items-center py-4">
          <Input
            placeholder={`Search by ${filterBy}....`}
            value={
              (table.getColumn(filterBy)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterBy)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={
                  !table.getRowModel().rows.some((row) => row.getIsSelected())
                }
              >
                Delete
                <Trash />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" className={"w-1/2"}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const selected = table
                      .getRowModel()
                      .rows.filter((row) => row.getIsSelected());

                    // deleted selected user here
                    deleteFNAction(
                      // @ts-expect-error typescript just somehow don't know the type
                      selected.map((item) => item.original.id),
                    ).then((response: ActionResponse<TData>) => {
                      if (response.status === "ERROR") {
                        toast({
                          title: "Error",
                          description: response.error,
                          variant: "destructive",
                        });
                      } else {
                        toast({
                          title: "Congratulations!!! User successfully deleted",
                          description: response.success,
                        });
                      }
                    });
                  }}
                  disabled={
                    !table.getRowModel().rows.some((row) => row.getIsSelected())
                  }
                  className={"w-1/2"}
                >
                  Delete Anyway
                  <Trash />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Table className={"rounded-md bg-white"}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={"relative"}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isFetching ? (
            <>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={"h-24 text-center"}
                >
                  <span className={"ml-4"}>Loading </span>
                  <LoaderCircle
                    className={"inline animate-spin"}
                  ></LoaderCircle>
                </TableCell>
              </TableRow>
            </>
          ) : table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={""}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className={"h-24 text-center"}
              >
                No results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className={"mt-4 flex w-full items-center justify-between"}>
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
