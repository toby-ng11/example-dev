import { DataTableColumnHeader } from '@/components/table-header';
import DataTableMain from '@/components/table-main';
import DataTableRowEditingButtons from '@/components/table-row-editing-buttons';
import DataTableRowOptions from '@/components/table-row-options';
import { DataTableSkeleton } from '@/components/table-skeleton';
import { Input } from '@/components/ui/input';
import { useTanStackQuery } from '@/hooks/use-query';
import { type MarketSegment } from '@/types';
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
import MarketSegmentTableAddButton from './market-segments-add-button';

export default function MarketSegmentTable() {
    const queryClient = useQueryClient();
    const [sorting, setSorting] = useState<SortingState>([{ id: 'market_segment_desc', desc: false }]);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [editedValue, setEditedValue] = useState<string>('');

    const ENDPOINT = '/market-segments';
    const qKey = ['admin', 'market-segments'];

    const { data: marketSegments = [], isLoading, isFetching } = useTanStackQuery<MarketSegment>(ENDPOINT, qKey);

    const handleEdit = async (rowId: string, editedValue: string) => {
        try {
            const { data } = await axios.put(`${ENDPOINT}/${rowId}`, {
                market_segment_desc: editedValue,
            });
            if (data) {
                await queryClient.invalidateQueries({ queryKey: qKey });
                setEditingRowId(null);
                setEditedValue('');
                toast.success(data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to update segment.');
        }
    };

    const handleDelete = async (rowId: string) => {
        if (!rowId) return;
        try {
            const { data } = await axios.delete(`${ENDPOINT}/${rowId}`);
            if (data.exists) {
                toast.warning(`Cannot delete market segment #${rowId} — it still has projects.`);
                return;
            }
            await queryClient.invalidateQueries({ queryKey: qKey });
            toast.success(data.message);
            return true;
        } catch (error) {
            toast.warning(`Error: ${error}.`);
            return false;
        }
    };

    const columns: ColumnDef<MarketSegment>[] = [
        {
            accessorKey: 'market_segment_desc',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Market Segment" />,
            enableHiding: false,
            meta: 'Market Segment',
            cell: ({ row }) => {
                const rowId = row.original.id;
                const value = row.getValue('market_segment_desc') as string;

                if (editingRowId === rowId) {
                    return (
                        <Input
                            className="h-8"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleEdit(rowId, editedValue);
                                } else if (e.key === 'Escape') {
                                    setEditingRowId(null);
                                    setEditedValue('');
                                }
                            }}
                        />
                    );
                }

                return <span>{value}</span>;
            },
        },
        {
            accessorKey: 'options',
            header: () => null,
            cell: ({ row }) => {
                const rowId = row.original.id; // adjust based on your data shape
                const isEditing = editingRowId === rowId;

                if (isEditing) {
                    return (
                        <DataTableRowEditingButtons
                            saveEdit={() => handleEdit(rowId, editedValue)}
                            cancel={() => {
                                setEditingRowId(null);
                                setEditedValue('');
                            }}
                        />
                    );
                } else {
                    return (
                        <DataTableRowOptions
                            rowId={rowId}
                            onEdit={() => {
                                setEditingRowId(rowId);
                                setEditedValue(row.getValue('market_segment_desc'));
                            }}
                            onDelete={() => handleDelete(rowId)}
                            deleteAlertDescription={`This action cannot be undone. This will permanently delete the market segment: ${row.original.market_segment_desc}.
                            It can't be deleted if still used by projects or opportunities.`}
                        />
                    );
                }
            },
            enableHiding: false,
        },
    ];

    const table = useReactTable({
        data: marketSegments,
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
                <MarketSegmentTableAddButton endpoint={ENDPOINT} queryKey={qKey} />

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Market Segments</h2>
                    <p className="text-muted-foreground">Project and opportunity segments can be added or editted here.</p>
                </div>
                <div className="flex flex-col gap-4">
                    {!isLoading && !isFetching ? <DataTableMain isFetching={isFetching} table={table} columns={columns} /> : <DataTableSkeleton rows={5} cols={5} />}
                </div>
            </div>
        </div>
    );
}
