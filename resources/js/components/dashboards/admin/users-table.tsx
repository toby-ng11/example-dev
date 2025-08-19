import { DataTableColumnHeader } from '@/components/table-header';
import DataTableMain from '@/components/table-main';
import { DataTablePagination } from '@/components/table-pagination';
import { DataTableSkeleton } from '@/components/table-skeleton';
import { DataTableToolbar } from '@/components/table-toolbar';
import { useTanStackQuery } from '@/hooks/use-query';
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
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

interface User {
    id: string;
    name: string;
    default_company: string;
    default_location_id: string;
    email_address: string;
    role: string;
    p2q_system_role: string;
}

const multiValueFilter: FilterFn<User> = (row, columnId, filterValue) => {
    if (!Array.isArray(filterValue)) return true;
    const rowValue = row.getValue(columnId);
    return filterValue.includes(rowValue);
};

const ENDPOINT = '/dashboard/admin/users';
const columnVisibilityPref = '/lapi/preferences/admin-users-table-column-visibility';
const qKey = ['admin', 'users'];

export default function UsersTable() {
    const { data: users = [], isLoading, isFetching } = useTanStackQuery<User>(ENDPOINT, qKey);
    const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [isReady, setIsReady] = useState(false);
    const lastSavedVisibility = useRef<VisibilityState>({});

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

    const columns: ColumnDef<User>[] = [
        {
            header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
            accessorKey: 'id',
            meta: 'ID',
        },
        {
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
            accessorKey: 'name',
            meta: 'Name',
        },
        {
            header: ({ column }) => <DataTableColumnHeader column={column} title="Company" />,
            accessorKey: 'default_company',
            filterFn: 'arrIncludesSome',
            meta: 'Company',
        },
        {
            header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
            accessorKey: 'default_location_id',
            filterFn: 'arrIncludesSome',
            meta: 'Location',
        },
        {
            header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
            accessorKey: 'email_address',
            meta: 'Email',
        },
        {
            header: ({ column }) => <DataTableColumnHeader column={column} title="P21 Role" />,
            accessorKey: 'role',
            filterFn: 'arrIncludesSome',
            meta: 'P21 Role',
        },
        {
            header: ({ column }) => <DataTableColumnHeader column={column} title="P2Q Role" />,
            accessorKey: 'p2q_system_role',
            filterFn: 'arrIncludesSome',
            meta: 'P2Q Role',
        },
    ];

    const table = useReactTable({
        data: users,
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
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-full flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <div className="flex flex-1 flex-col gap-4 p-2">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">All Users</h2>
                    <p className="text-muted-foreground">All users across all branches.</p>
                </div>
                <div className="flex flex-col gap-4">
                    {!isLoading && isReady && !isFetching ? (
                        <>
                            <DataTableToolbar
                                table={table}
                                searchColumn="name"
                                searchPlaceholder="Search users..."
                                facetedFilters={[
                                    { columnId: 'default_company', title: 'Company' },
                                    { columnId: 'default_location_id', title: 'Location' },
                                    { columnId: 'role', title: 'P21 Role' },
                                    { columnId: 'p2q_system_role', title: 'P2Q Role' },
                                ]}
                            />

                            <DataTableMain table={table} columns={columns} />
                            <DataTablePagination table={table} hasSelect={false} />
                        </>
                    ) : (
                        <DataTableSkeleton rows={15} cols={5} />
                    )}
                </div>
            </div>
        </div>
    );
}
