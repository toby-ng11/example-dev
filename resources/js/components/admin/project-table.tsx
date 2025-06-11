import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import axios from 'axios';
import { ArrowUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Project {
    project_id: number;
    project_id_ext: string;
    project_name: string;
    owner_id: string;
    shared_id: string;
    created_at: string;
    due_date: string;
    architect_name: string;
    market_segment_desc: string;
    status_desc: string;
}

export default function ProjectTable() {
    const [data, setData] = useState<Project[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    useEffect(() => {
        axios.get('/admin/projects').then((res) => setData(res.data));
    }, []);

    const columns: ColumnDef<Project>[] = [
        {
            accessorKey: 'project_id',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        ID
                        <ArrowUpDown className="h4 ml-2 w-4" />
                    </Button>
                );
            },
        },
        {
            header: 'Ext. ID',
            accessorKey: 'project_id_ext',
        },
        {
            header: 'Name',
            accessorKey: 'project_name',
            cell: ({ row }) => <div className="text-left">{row.getValue('project_name')}</div>,
        },
        {
            header: 'Owner',
            accessorKey: 'owner_id',
        },
        {
            header: 'Shared',
            accessorKey: 'shared_id',
        },
        {
            header: 'Create Date',
            accessorKey: 'created_at',
        },
        {
            header: 'Due Date',
            accessorKey: 'due_date',
        },
        {
            header: 'Architect',
            accessorKey: 'architect_name',
            cell: ({ row }) => <div className="text-left">{row.getValue('architect_name')}</div>,
        },
        {
            header: 'Market Segment',
            accessorKey: 'market_segment_desc',
        },
        {
            header: 'Status',
            accessorKey: 'status_desc',
        },
        {
            header: 'Make Quote',
            cell: () => <button className="bg-primary hover:bg-primary/90 rounded px-3 py-1 text-white">Make Quote</button>,
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <h2 className="mb-4 text-xl font-semibold">All Projects</h2>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-center whitespace-nowrap">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="text-center whitespace-nowrap">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <div className="text-muted-foreground text-sm">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
