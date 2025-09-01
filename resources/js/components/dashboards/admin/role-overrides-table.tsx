import { DataTableColumnHeader } from '@/components/table-header';
import DataTableMain from '@/components/table-main';
import DataTableRowDeleteButton from '@/components/table-row-delete-button';
import { DataTableSkeleton } from '@/components/table-skeleton';
import { useTanStackQuery } from '@/hooks/use-query';
import { useQueryClient } from '@tanstack/react-query';
import {
    ColumnDef,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import RoleOverrideAddButton from './role-overrides-table-add-button';
import RoleCell from './role-overrides-table-role-cell';

export interface RoleOverride {
    user_id: string;
    override_role: string;
}

export default function RoleOverrideTable() {
    const queryClient = useQueryClient();
    const [sorting, setSorting] = useState<SortingState>([{ id: 'user_id', desc: false }]);

    const ENDPOINT = '/role-overrides';
    const qKey = ['admin', 'role-overrides'];

    const { data: roleOverrides = [], isLoading, isFetching } = useTanStackQuery<RoleOverride>(ENDPOINT, qKey);

    const handleDelete = async (rowId: string) => {
        if (!rowId) return;
        try {
            const { data } = await axios.delete(`${ENDPOINT}/${rowId}`);
            await queryClient.invalidateQueries({ queryKey: qKey });
            toast.success(data.message);
            return true;
        } catch (error) {
            toast.warning(`Error: ${error}.`);
            return false;
        }
    };

    const columns: ColumnDef<RoleOverride>[] = [
        {
            header: ({ column }) => <DataTableColumnHeader column={column} title="User" />,
            accessorKey: 'user_id',
        },
        {
            accessorKey: 'override_role',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
            cell: ({ row }) => {
                const original = row.original;
                const rowId = original.user_id;
                const overrideRole = original.override_role;

                return <RoleCell endpoint={ENDPOINT} queryKey={qKey} user_id={rowId} override_role={overrideRole} />;
            },
        },
        {
            accessorKey: 'options',
            header: () => null,
            cell: ({ row }) => {
                const rowId = row.original.user_id; // adjust based on your data shape
                return <DataTableRowDeleteButton rowId={rowId} handleDelete={() => handleDelete(rowId)} />;
            },
            enableHiding: false,
        },
    ];

    const table = useReactTable({
        data: roleOverrides,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <div className="flex flex-1 flex-col gap-4 p-2">
                <RoleOverrideAddButton endpoint={ENDPOINT} queryKey={qKey} />

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Role Override</h2>
                    <p className="text-muted-foreground">
                        Override a user's role. All default role are shown in <b>All Users</b> table.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    {!isLoading && !isFetching ? <DataTableMain isFetching={isFetching} table={table} columns={columns} /> : <DataTableSkeleton rows={5} cols={5} />}
                </div>
            </div>
        </div>
    );
}
