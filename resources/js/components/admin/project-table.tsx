import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
import { ArrowDown, ArrowUp, ArrowUpDown, Ellipsis, LucideSettings2, PlusCircle } from 'lucide-react';
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
            accessorKey: 'project_id',
            header: ({ column }) => {
                const isSorted = column.getIsSorted();
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(isSorted === 'asc')}>
                        ID
                        {isSorted === 'asc' ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                        ) : isSorted === 'desc' ? (
                            <ArrowDown className="ml-2 h-4 w-4" />
                        ) : (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                );
            },
            cell: ({ row }) => <div className="text-center">{row.getValue('project_id')}</div>,
            enableHiding: false,
        },
        {
            header: 'Ext. ID',
            accessorKey: 'project_id_ext',
        },
        {
            header: 'Name',
            accessorKey: 'project_name',
            cell: ({ row }) => <div className="max-w-[400px] truncate font-medium">{row.getValue('project_name')}</div>,
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
            cell: ({ row }) => dayjs(row.getValue('created_at')).format('MMM D, YYYY'),
        },
        {
            header: 'Due Date',
            accessorKey: 'due_date',
            cell: ({ row }) => dayjs(row.getValue('due_date')).format('MMM D, YYYY'),
        },
        {
            header: 'Architect',
            accessorKey: 'architect_name',
            cell: ({ row }) => <div className="max-w-[300px] truncate font-medium">{row.getValue('architect_name')}</div>,
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
            header: 'Options',
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <LucideSettings2 /> Customize Columns
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
                                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                                >
                                                    {column.columnDef.header as string}
                                                </DropdownMenuCheckboxItem>
                                            );
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
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
