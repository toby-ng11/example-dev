import { DataTableColumnHeader } from '@/components/table-header';
import DataTableMain from '@/components/table-main';
import { DataTablePagination } from '@/components/table-pagination';
import { DataTableRefreshButton } from '@/components/table-refresh-button';
import { DataTableSkeleton } from '@/components/table-skeleton';
import { DataTableToolbar } from '@/components/table-toolbar';
import { Checkbox } from '@/components/ui/checkbox';
import { useTanStackQuery } from '@/hooks/use-query';
import { Link } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

interface Quote {
    id: string;
    project_id: string;
    project_name: string;
    created_by: string;
    customer_name: string;
    contact_full_name: string;
    created_at: string;
    quote_status: string;
}

const multiValueFilter: FilterFn<Quote> = (row, columnId, filterValue) => {
    if (!Array.isArray(filterValue)) return true;
    const rowValue = row.getValue(columnId);
    return filterValue.includes(rowValue);
};

const ENDPOINT = '/dashboard/admin/quotes';
const columnVisibilityPref = '/lapi/preferences/admin-quotes-table-column-visibility';
const qKey = ['admin', 'quotes'];

export default function QuotesTable() {
    const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [isReady, setIsReady] = useState(false);
    const lastSavedVisibility = useRef<VisibilityState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 15,
    });

    const { data: quotes = [], isLoading, isFetching, refetch, dataUpdatedAt } = useTanStackQuery<Quote>(ENDPOINT, qKey);

    // Restore saved visibility
    useEffect(() => {
        axios.get(columnVisibilityPref).then((res) => {
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
            axios.post(columnVisibilityPref, {
                value: columnVisibility,
            });
            lastSavedVisibility.current = columnVisibility;
        }
    }, [columnVisibility, isReady]);

    const columns: ColumnDef<Quote>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <div className="flex items-center justify-center">
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
            cell: ({ row }) => {
                const id = row.getValue<number>('id');
                return (
                    <Link href={`/quotes/${id}/edit`} className="text-blue-500 dark:text-blue-300">
                        {id}
                    </Link>
                );
            },
            enableHiding: false,
            meta: 'ID',
        },
        {
            header: ({ column }) => <DataTableColumnHeader column={column} title="Project ID" />,
            accessorKey: 'project_id',
            meta: 'Project ID',
        },
        {
            accessorKey: 'project_name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
            cell: ({ row }) => <div className="max-w-[300px] min-w-[300px] truncate">{row.getValue('project_name')}</div>,
            meta: 'Name',
        },
        {
            accessorKey: 'created_by',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Taker" />,
            filterFn: 'arrIncludesSome',
            meta: 'Taker',
        },
        {
            accessorKey: 'customer_name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
            cell: ({ row }) => <div className="max-w-[300px] truncate font-medium">{row.getValue('customer_name')}</div>,
            filterFn: 'arrIncludesSome',
            meta: 'Customer',
        },
        {
            accessorKey: 'contact_full_name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Contact" />,
            cell: ({ row }) => <div className="max-w-[300px] truncate font-medium">{row.getValue('contact_full_name')}</div>,
            filterFn: 'arrIncludesSome',
            meta: 'Contact',
        },
        {
            id: 'created_at',
            accessorFn: (row) => row.created_at,
            header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
            cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }),
            sortingFn: 'datetime',
            meta: 'Created At',
        },
        {
            accessorKey: 'quote_status',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            filterFn: 'arrIncludesSome',
            meta: 'Status',
        },
    ];

    const table = useReactTable({
        data: quotes,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            pagination,
            sorting,
            columnFilters,
            columnVisibility,
        },
        filterFns: {
            multi: multiValueFilter,
        },
    });

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-full flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <DataTableRefreshButton
                onRefresh={() => refetch({ cancelRefetch: true })}
                isFetching={isFetching}
                isReady={isReady}
                dataUpdatedAt={dataUpdatedAt}
            />

            <div className="flex flex-1 flex-col gap-4 p-2">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">All Quotes</h2>
                    <p className="text-muted-foreground">Here's the list of all quotes across all branches.</p>
                </div>
                <div className="flex flex-col gap-4">
                    {!isLoading && isReady && !isFetching ? (
                        <>
                            <DataTableToolbar
                                table={table}
                                searchColumn="project_name"
                                searchPlaceholder="Filter jobs name..."
                                facetedFilters={[
                                    { columnId: 'created_by', title: 'Taker' },
                                    { columnId: 'customer_name', title: 'Customer' },
                                    { columnId: 'contact_full_name', title: 'Contact' },
                                    { columnId: 'quote_status', title: 'Status' },
                                ]}
                            />

                            <DataTableMain
                                isFetching={isFetching}
                                table={table}
                                columns={columns}
                                key={`table-${pagination.pageIndex}`}
                                pageSize={pagination.pageSize}
                            />
                            <DataTablePagination table={table} />
                        </>
                    ) : (
                        <DataTableSkeleton rows={15} cols={5} />
                    )}
                </div>
            </div>
        </div>
    );
}
