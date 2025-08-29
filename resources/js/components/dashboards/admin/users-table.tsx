import { DataTableSkeleton } from '@/components/table-skeleton';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import axios from 'axios';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useMemo, useState } from 'react';

interface User {
    id: string;
    name: string;
    default_company: string;
    default_location_id: string;
    email_address: string;
    role: string;
    p2q_system_role: string;
}

interface AdminUserTable {
    data: User[];
    pagination: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export default function UsersTable() {
    const columns = useMemo<ColumnDef<User>[]>(
        () => [
            {
                header: 'ID',
                accessorKey: 'id',
                meta: 'ID',
            },
            {
                header: 'Name',
                accessorKey: 'name',
                meta: 'Name',
            },
            {
                header: 'Company',
                accessorKey: 'default_company',
                meta: 'Company',
            },
            {
                header: 'Location',
                accessorKey: 'default_location_id',
                meta: 'Location',
            },
            {
                header: 'Email',
                accessorKey: 'email_address',
                meta: 'Email',
            },
            {
                header: 'P21 Role',
                accessorKey: 'role',
                meta: 'P21 Role',
            },
            {
                header: 'P2Q Role',
                accessorKey: 'p2q_system_role',
                meta: 'P2Q Role',
            },
        ],
        [],
    );

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const ENDPOINT = '/dashboard/admin/users';
    //const columnVisibilityPref = '/lapi/preferences/admin-users-table-column-visibility';
    const qKey = ['admin', 'users', pagination];

    const users = useQuery({
        queryKey: qKey,
        queryFn: async () => {
            const res = await axios.get<AdminUserTable>(ENDPOINT, {
                params: {
                    page: pagination.pageIndex + 1,
                    limit: pagination.pageSize,
                },
            });
            return {
                rows: res.data.data,
                pageCount: res.data.pagination.last_page,
                rowCount: res.data.pagination.total,
            };
        },
        placeholderData: keepPreviousData,
    });

    const defaultData = useMemo(() => [], []);

    const table = useReactTable({
        data: users.data?.rows ?? defaultData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        rowCount: users.data?.rowCount,
        manualPagination: true,
        state: {
            pagination,
        },
    });

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-full flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <div className="flex flex-1 flex-col gap-4 p-2">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">All Users</h2>
                    <p className="text-muted-foreground">All users across all branches.</p>
                </div>
                {users.isLoading && users.isFetching ? (
                    <DataTableSkeleton rows={10} cols={5} />
                ) : (
                    <div className="flex flex-col gap-4">
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
                                                No data found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium">Rows per page</p>
                                <Select
                                    value={`${table.getState().pagination.pageSize}`}
                                    onValueChange={(value) => {
                                        table.setPageSize(Number(value));
                                    }}
                                >
                                    <SelectTrigger className="h-8 w-[70px]">
                                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {[10, 15, 20, 25, 30, 40, 50].map((pageSize) => (
                                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                                {pageSize}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-6 lg:space-x-8">
                                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="hidden size-8 lg:flex"
                                        onClick={() => table.firstPage()}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        <span className="sr-only">Go to first page</span>
                                        <ChevronsLeft />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="size-8"
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        <span className="sr-only">Go to previous page</span>
                                        <ChevronLeft />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="size-8"
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        <span className="sr-only">Go to next page</span>
                                        <ChevronRight />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="hidden size-8 lg:flex"
                                        onClick={() => table.lastPage()}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        <span className="sr-only">Go to last page</span>
                                        <ChevronsRight />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
