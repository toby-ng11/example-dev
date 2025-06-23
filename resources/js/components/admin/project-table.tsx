import { DataTableViewOptions } from '@/components/table-column-toggle';
import { DataTableColumnHeader } from '@/components/table-header';
import { DataTablePagination } from '@/components/table-pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
} from '@tanstack/react-table';
import axios from 'axios';
import dayjs from 'dayjs';
import { Ellipsis, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Project {
    id: number;
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
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    useEffect(() => {
        axios.get('/admin/projects').then((res) => setData(res.data));
    }, []);

    // Restore saved visibility
    useEffect(() => {
        axios.get('/api/preferences/projectTableColumnVisibility').then((res) => {
            setColumnVisibility(res.data);
        });
    }, []);

    useEffect(() => {
        if (Object.keys(columnVisibility).length > 0) {
            axios.post('/api/preferences/projectTableColumnVisibility', {
                value: columnVisibility,
            });
        }
    }, [columnVisibility]);

    const columns: ColumnDef<Project>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="ID" className="justify-center" />,
            cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
            enableHiding: false,
            meta: 'ID',
        },
        {
            header: 'Ext. ID',
            accessorKey: 'project_id_ext',
            meta: 'Ext. ID',
        },
        {
            accessorKey: 'project_name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
            cell: ({ row }) => <div className="max-w-[400px] truncate font-medium">{row.getValue('project_name')}</div>,
            meta: 'Name',
        },
        {
            accessorKey: 'owner_id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Owner" />,
            meta: 'Owner',
        },
        {
            accessorKey: 'shared_id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Shared" />,
            meta: 'Shared',
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
            cell: ({ row }) => dayjs(row.getValue('created_at')).format('MMM D, YYYY'),
            meta: 'Created At',
        },
        {
            accessorKey: 'due_date',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
            cell: ({ row }) => dayjs(row.getValue('due_date')).format('MMM D, YYYY'),
            meta: 'Due Date',
        },
        {
            accessorKey: 'architect_name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Architect" />,
            cell: ({ row }) => <div className="max-w-[300px] truncate font-medium">{row.getValue('architect_name')}</div>,
            meta: 'Architect',
        },
        {
            accessorKey: 'market_segment_desc',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Market Segment" />,
            meta: 'Market Segment',
        },
        {
            accessorKey: 'status_desc',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            meta: 'Status',
        },
        {
            accessorKey: 'options',
            header: () => null,
            cell: () => (
                <Button variant="ghost">
                    <Ellipsis className="h-4 w-4" />
                </Button>
            ),
            enableHiding: false,
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
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
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <div className="flex flex-1 flex-col gap-4 p-2">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">All Projects</h2>
                    <p className="text-muted-foreground">Here's the list of all projects across all branches.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Input
                                placeholder="Filter project names..."
                                value={(table.getColumn('project_name')?.getFilterValue() as string) ?? ''}
                                onChange={(event) => table.getColumn('project_name')?.setFilterValue(event.target.value)}
                                className="h-8 max-w-xs"
                            />
                            <Button variant="outline" size="sm" className="border-dashed">
                                <PlusCircle /> Owner
                            </Button>
                            <Button variant="outline" size="sm" className="border-dashed">
                                <PlusCircle /> Shared
                            </Button>
                            <Button variant="outline" size="sm" className="border-dashed">
                                <PlusCircle /> Architect
                            </Button>
                            <Button variant="outline" size="sm" className="border-dashed">
                                <PlusCircle /> Market Segment
                            </Button>
                            <Button variant="outline" size="sm" className="border-dashed">
                                <PlusCircle /> Status
                            </Button>
                        </div>
                        <div className="flex items-center gap-4">
                            <DataTableViewOptions table={table} />
                            <Button size="sm">Add Project</Button>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-md border">
                        <Table>
                            <TableHeader className="bg-muted sticky top-0 z-10 [&_tr]:border-b">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id} className="text-left whitespace-nowrap">
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
                                            <TableCell key={cell.id} className="p-2 text-left whitespace-nowrap">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <DataTablePagination table={table} />
            </div>
        </div>
    );
}
