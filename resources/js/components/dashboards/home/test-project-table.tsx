import DataTableMain from '@/components/table-main';
import { DataTablePagination } from '@/components/table-pagination';
import { DataTableSkeleton } from '@/components/table-skeleton';
import { Input } from '@/components/ui/input';
import { Project } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    PaginationState,
    useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import { useMemo, useState } from 'react';

interface TestProjectTable {
    projects: {
        data: Project[];
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export default function TestProjectTable() {
    const columns = useMemo<ColumnDef<Project>[]>(
        () => [
            {
                header: 'ID',
                accessorKey: 'id',
            },
            {
                header: 'Ext. ID',
                accessorKey: 'project_id_ext',
            },
            {
                header: 'Name',
                accessorKey: 'project_name',
            },
            {
                header: 'Address',
                accessorKey: 'project_address',
            },
            {
                header: 'Brach',
                accessorKey: 'centura_location_id',
            },
        ],
        [],
    );

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const ENDPOINT = '/projects';
    //const columnVisibilityPref = '/lapi/preferences/admin-users-table-column-visibility';
    const qKey = ['home', 'projects', pagination, columnFilters];

    const users = useQuery({
        queryKey: qKey,
        queryFn: async () => {
            const params: Record<string, string | number> = {
                page: pagination.pageIndex + 1,
                size: pagination.pageSize,
            };

            columnFilters.forEach((filter) => {
                const { id, value } = filter;

                switch (id) {
                    case 'project_name':
                        if (value && typeof value === 'string' && value.trim()) {
                            params.search = value.trim();
                        }
                        break;
                }
            });

            const res = await axios.get<TestProjectTable>(ENDPOINT, { params });
            return {
                rows: res.data.projects.data,
                pageCount: res.data.projects.last_page,
                rowCount: res.data.projects.total,
            };
        },
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 60,
    });

    const defaultData = useMemo(() => [], []);

    const table = useReactTable({
        data: users.data?.rows ?? defaultData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onPaginationChange: setPagination,
        rowCount: users.data?.rowCount,
        manualPagination: true,
        manualFiltering: true,
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
                        <div className="hidden flex-wrap gap-2 lg:flex">
                            <Input
                                placeholder="Search projects name..."
                                value={(table.getColumn('project_name')?.getFilterValue() as string) ?? ''}
                                onChange={(e) => {
                                    table.getColumn('project_name')?.setFilterValue(e.target.value);
                                    // Reset pagination when search changes
                                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                                }}
                                className="h-8 w-[150px] lg:w-[250px]"
                            />
                        </div>
                        <DataTableMain
                            key={`table-${pagination.pageIndex}-${pagination.pageSize}`}
                            table={table}
                            columns={columns}
                            isFetching={users.isFetching}
                        />

                        <DataTablePagination table={table} tablePaginationState={pagination} />
                    </div>
                )}
            </div>
        </div>
    );
}
