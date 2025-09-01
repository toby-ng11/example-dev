import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, flexRender, Table as TanStackTable } from '@tanstack/react-table';

interface DataTableMainProps<TData> {
    table: TanStackTable<TData>;
    columns: ColumnDef<TData>[];
    isFetching: boolean;
}

export default function DataTableMain<TData>({ table, columns, isFetching }: DataTableMainProps<TData>) {
    return (
        <div className="overflow-hidden rounded-md border">
            {isFetching ? (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/20 backdrop-blur-sm transition">
                    <span className="h-6 w-6 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
                </div>
            ) : (
                <Table>
                    <TableHeader className="bg-muted sticky top-0 z-10 [&_tr]:border-b">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="p-2 text-left whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No data found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
