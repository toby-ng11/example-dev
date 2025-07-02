import { DataTableColumnHeader } from '@/components/table-header';
import { DataTablePagination } from '@/components/table-pagination';
import { DataTableLoadingSpinner } from '@/components/table-spinner';
import { DataTableToolbar } from '@/components/table-toolbar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import axios from 'axios';
import dayjs from 'dayjs';
import { Ellipsis } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Project {
    id: number;
    project_id_ext: string;
    project_name: string;
    created_by: string;
    shared_id: string;
    created_at: string;
    due_date: string;
    architect_name: string;
    market_segment_desc: string;
    status_desc: string;
}

const multiValueFilter: FilterFn<Project> = (row, columnId, filterValue) => {
    if (!Array.isArray(filterValue)) return true;
    const rowValue = row.getValue(columnId);
    return filterValue.includes(rowValue);
};

export default function ProjectTable() {
    const [data, setData] = useState<Project[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [isReady, setIsReady] = useState(false);
    const lastSavedVisibility = useRef<VisibilityState>({});

    useEffect(() => {
        axios.get('/admin/projects').then((res) => setData(res.data));
    }, []);

    // Restore saved visibility
    useEffect(() => {
        axios.get('/api/api/preferences/projectTableColumnVisibility').then((res) => {
            setColumnVisibility(res.data || {});
            lastSavedVisibility.current = res.data;
            setIsReady(true);
        });
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const current = JSON.stringify(columnVisibility);
        const previous = JSON.stringify(lastSavedVisibility.current);

        if (current !== previous) {
            axios.post('/api/api/preferences/projectTableColumnVisibility', {
                value: columnVisibility,
            });
            lastSavedVisibility.current = columnVisibility;
        }
    }, [columnVisibility, isReady]);

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
            accessorKey: 'created_by',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Owner" />,
            filterFn: 'arrIncludesSome',
            meta: 'Owner',
        },
        {
            accessorKey: 'shared_id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Shared" />,
            filterFn: 'arrIncludesSome',
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
            filterFn: 'arrIncludesSome',
            meta: 'Architect',
        },
        {
            accessorKey: 'market_segment_desc',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Market Segment" />,
            filterFn: 'arrIncludesSome',
            meta: 'Market Segment',
        },
        {
            accessorKey: 'status_desc',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            filterFn: 'arrIncludesSome',
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
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        filterFns: {
            multi: multiValueFilter,
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
                    <DataTableToolbar
                        table={table}
                        searchColumn="project_name"
                        searchPlaceholder="Filter project names..."
                        showAddButton
                        onAddClick={() => console.log('Add clicked')}
                        facetedFilters={[
                            { columnId: 'created_by', title: 'Owner' },
                            { columnId: 'shared_id', title: 'Shared' },
                            { columnId: 'architect_name', title: 'Architect' },
                            { columnId: 'market_segment_desc', title: 'Market Segment' },
                            { columnId: 'status_desc', title: 'Status' },
                        ]}
                    />

                    {isReady ? (
                        <div className="overflow-hidden rounded-md border">
                            <Table>
                                <TableHeader className="bg-muted sticky top-0 z-10 [&_tr]:border-b">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id} colSpan={header.colSpan}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(header.column.columnDef.header, header.getContext())}
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
                                                No projects found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <DataTableLoadingSpinner />
                    )}
                </div>

                <DataTablePagination table={table} />
            </div>
        </div>
    );
}
