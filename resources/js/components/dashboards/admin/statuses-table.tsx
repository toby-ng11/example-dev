import { DataTableColumnHeader } from '@/components/table-header';
import DataTableMain from '@/components/table-main';
import DataTableRowEditingButtons from '@/components/table-row-editing-buttons';
import DataTableRowOptions from '@/components/table-row-options';
import { DataTableSkeleton } from '@/components/table-skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useTanStackQuery } from '@/hooks/use-query';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import StatusesTableAddButton from './statuses-table-add-button';

interface Status {
    id: number;
    status_desc: string;
    project_flag: 'Y' | 'N' | null;
    quote_flag: 'Y' | 'N' | null;
}

export default function StatusesTable() {
    const queryClient = useQueryClient();
    const [sorting, setSorting] = useState<SortingState>([{ id: 'status_desc', desc: false }]);
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [editedValue, setEditedValue] = useState<string>('');

    const [loading, setLoading] = useState(false);

    const ENDPOINT = '/statuses';
    const qKey = ['admin', 'statuses'];

    const { data: statuses = [], isLoading, isFetching } = useTanStackQuery<Status>(ENDPOINT, qKey);

    const handleEdit = async (rowId: number, editedValue: string) => {
        try {
            const { data } = await axios.put(`${ENDPOINT}/${rowId}`, {
                status_desc: editedValue,
            });
            if (data) {
                await Promise.all([
                    queryClient.invalidateQueries({ queryKey: qKey }),
                    queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] }),
                    queryClient.invalidateQueries({ queryKey: ['admin', 'quotes'] }),
                ]);
                setEditingRowId(null);
                setEditedValue('');
                toast.success(data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to update segment.');
        }
    };

    const handleDelete = async (rowId: number) => {
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

    const handleToggle = async (rowId: number, flagName: 'project_flag' | 'quote_flag', newChecked: boolean) => {
        setLoading(true);
        try {
            const response = await axios.put(`${ENDPOINT}/${rowId}`, {
                [flagName]: newChecked ? 'Y' : 'N',
            });

            const { success, message } = response.data;

            if (success) {
                await queryClient.invalidateQueries({ queryKey: qKey });
                toast.success(message || 'Updated');
            } else {
                toast.warning(message || 'Update blocked by validation');
            }
        } catch (err) {
            toast.error('Failed to update quote flag');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const columns: ColumnDef<Status>[] = [
        {
            accessorKey: 'status_desc',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            enableHiding: false,
            cell: ({ row }) => {
                const rowId = row.original.id;
                const value = row.getValue('status_desc') as string;

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
            accessorKey: 'project_flag',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Project" />,
            enableHiding: false,
            cell: ({ row }) => {
                const original = row.original;
                const rowId = original.id;
                const isChecked = original.project_flag === 'Y';

                const handleCheckChange = async (newCheck: boolean) => {
                    await handleToggle(rowId, 'project_flag', newCheck);
                };

                return (
                    <div className="flex justify-center">
                        <Checkbox checked={isChecked} disabled={loading} onCheckedChange={handleCheckChange} />
                    </div>
                );
            },
        },
        {
            accessorKey: 'quote_flag',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Quote" />,
            enableHiding: false,
            cell: ({ row }) => {
                const original = row.original;
                const rowId = original.id;
                const isChecked = original.quote_flag === 'Y';

                const handleCheckChange = async (newCheck: boolean) => {
                    await handleToggle(rowId, 'quote_flag', newCheck);
                };

                return (
                    <div className="flex justify-center">
                        <Checkbox checked={isChecked} disabled={loading} onCheckedChange={handleCheckChange} />
                    </div>
                );
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
                                setEditedValue(row.getValue('status_desc'));
                            }}
                            onDelete={() => handleDelete(rowId)}
                            deleteAlertDescription={`This action cannot be undone. This will permanently delete the status: ${row.original.status_desc}.
                            It can't be deleted if still used by projects or quotes.`}
                        />
                    );
                }
            },
            enableHiding: false,
        },
    ];

    const table = useReactTable({
        data: statuses,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <div className="flex flex-1 flex-col gap-4 p-2">
                <StatusesTableAddButton endpoint={ENDPOINT} queryKey={qKey} />

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Worksheet Statuses</h2>
                    <p className="text-muted-foreground">Customize the statuses for opportunity, project and quote.</p>
                </div>
                <div className="flex flex-col gap-4">
                    {!isLoading && !isFetching ? <DataTableMain table={table} columns={columns} /> : <DataTableSkeleton rows={5} cols={5} />}
                </div>
            </div>
        </div>
    );
}
