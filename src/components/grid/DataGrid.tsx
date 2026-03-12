"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarCell } from "./cells/AvatarCell";
import { BadgeCell } from "./cells/BadgeCell";
import { CurrencyCell } from "./cells/CurrencyCell";
import { DateCell } from "./cells/DateCell";
import { NumberCell } from "./cells/NumberCell";
import { PercentageCell } from "./cells/PercentageCell";
import { EditableCell } from "./cells/EditableCell";
import type { GeneratedRow, TemplateField } from "@/types/engine";

interface DataGridProps {
  rows: GeneratedRow[];
  fields: TemplateField[];
  isAnimating: boolean;
  onCellEdit?: (rowId: string, field: string, value: unknown) => void;
}

export function DataGrid({
  rows,
  fields,
  isAnimating,
  onCellEdit,
}: DataGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const renderCell = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any, field: TemplateField, row: GeneratedRow) => {
      switch (field.type) {
        case "avatar":
          return (
            <AvatarCell
              name={String(value)}
              email={String(row._email ?? row.email ?? "")}
              avatar={String(row._avatar ?? "")}
            />
          );
        case "badge":
          return <BadgeCell value={String(value)} />;
        case "currency":
          if (typeof value === "object" && value && "amount" in value) {
            return <CurrencyCell value={value} />;
          }
          return (
            <span className="text-[13px] text-ds-text-primary font-data">
              {String(value)}
            </span>
          );
        case "date":
          return <DateCell value={String(value)} />;
        case "number":
          return <NumberCell value={Number(value)} />;
        case "percentage":
          return <PercentageCell value={Number(value)} />;
        case "boolean":
          return (
            <span
              className={cn(
                "text-[13px] font-data",
                value ? "text-amber-400" : "text-ds-text-secondary"
              )}
            >
              {value ? "Yes" : "No"}
            </span>
          );
        case "email":
          return (
            <EditableCell
              value={String(value)}
              onEdit={(v) => onCellEdit?.(row._id, field.key, v)}
            />
          );
        case "phone":
          return (
            <span className="text-[13px] text-ds-text-secondary font-data">
              {String(value)}
            </span>
          );
        default:
          return (
            <EditableCell
              value={String(value)}
              onEdit={(v) => onCellEdit?.(row._id, field.key, v)}
            />
          );
      }
    },
    [onCellEdit]
  );

  const columns = useMemo<ColumnDef<GeneratedRow>[]>(
    () =>
      fields
        .filter((f) => f.enabled)
        .map((field) => ({
          id: field.key,
          accessorKey: field.key,
          header: field.label,
          size: field.width,
          meta: { type: field.type, pinned: field.pinned },
          cell: ({ row: tableRow }) =>
            renderCell(
              tableRow.original[field.key],
              field,
              tableRow.original
            ),
        })),
    [fields, renderCell]
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows: tableRows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: tableRows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 44,
    overscan: 15,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  return (
    <div className="flex flex-col h-full bg-ds-bg-secondary/60 border border-ds-border rounded-xl overflow-hidden shadow-md">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-ds-border bg-ds-bg-secondary/80">
        <span className="text-xs text-ds-text-secondary font-data">
          {rows.length.toLocaleString()} rows
        </span>
      </div>

      {/* Grid */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto"
        style={{ contain: "strict" }}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-ds-bg-tertiary border-b border-ds-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <div key={headerGroup.id} className="flex">
                {headerGroup.headers.map((header) => {
                  const isPinned = (
                    header.column.columnDef.meta as { pinned?: boolean }
                  )?.pinned;
                  return (
                    <div
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        minWidth: header.getSize(),
                      }}
                      className={cn(
                        "px-3 py-3 text-left text-[11px] font-semibold text-ds-text-tertiary uppercase tracking-[0.08em] select-none",
                        "border-r border-ds-border/60 last:border-r-0 shrink-0",
                        isPinned &&
                          "sticky left-0 z-20 bg-ds-bg-tertiary shadow-[2px_0_4px_rgba(0,0,0,0.3)]",
                        header.column.getCanSort() &&
                          "cursor-pointer hover:text-ds-text-primary transition-colors"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" && (
                          <ChevronUp className="w-3 h-3" />
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <ChevronDown className="w-3 h-3" />
                        )}
                        {header.column.getCanSort() &&
                          !header.column.getIsSorted() && (
                            <ChevronsUpDown className="w-3 h-3 opacity-30" />
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Virtualized Rows */}
          {virtualRows.map((virtualRow) => {
            const row = tableRows[virtualRow.index];
            const scenario = row.original._scenario;
            const scenarioBorderColor =
              scenario === "churning_customer"
                ? "border-l-amber-500"
                : scenario === "power_user"
                  ? "border-l-violet-500"
                  : "border-l-transparent";

            return (
              <div
                key={row.id}
                className={cn(
                  "flex border-b border-ds-border/40 hover:bg-ds-bg-tertiary/40 transition-colors duration-150 border-l-2",
                  scenarioBorderColor,
                  isAnimating && "animate-cell-appear"
                )}
                style={{
                  position: "absolute",
                  top: virtualRow.start + 37, // header height offset
                  left: 0,
                  right: 0,
                  height: 44,
                  animationDelay: isAnimating
                    ? `${virtualRow.index * 15}ms`
                    : undefined,
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  const isPinned = (
                    cell.column.columnDef.meta as { pinned?: boolean }
                  )?.pinned;
                  return (
                    <div
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                      }}
                      className={cn(
                        "px-3 flex items-center border-r border-ds-border last:border-r-0 shrink-0 overflow-hidden",
                        isPinned &&
                          "sticky left-0 z-[5] bg-ds-bg-secondary shadow-[2px_0_4px_rgba(0,0,0,0.15)]"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
