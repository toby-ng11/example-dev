import { DataTableColumnHeader } from '@/components/table-header';
import DataTableMain from '@/components/table-main';
import DataTableRowOptions from '@/components/table-row-options';
import { DataTableSkeleton } from '@/components/table-skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTanStackQuery } from '@/hooks/use-query';
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
import { Plus, Save, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface MarketSegment {
    id: number;
    market_segment_desc: string;
}

export default function MarketSegmentTable() {
    const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [editedValue, setEditedValue] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newSegmentDesc, setNewSegmentDesc] = useState('');

    const ENDPOINT = '/market-segments';
    const qKey = ['admin', 'market-segments'];

    const { data: marketSegments = [], isLoading, isFetching, refetch } = useTanStackQuery<MarketSegment>(ENDPOINT, qKey);

    const handleSave = async (rowId: number, editedValue: string) => {
        try {
            if (rowId === 0) {
                const response = await axios.post('/market-segments', {
                    market_segment_desc: editedValue,
                });

                if (response.data) {
                    refetch();
                    toast.success(`Saved: ${editedValue}.`);
                } else {
                    toast.error(`Error! Please check log for more detail.`);
                }
            } else {
                const { data } = await axios.put(`/market-segments/${rowId}`, {
                    market_segment_desc: editedValue,
                });
                if (data) {
                    setEditingRowId(null);
                    setEditedValue('');
                    toast.success(data.message);
                    refetch();
                }
            }
        } catch (err) {
            console.error(err);
            alert('Failed to update segment.');
        }
    };

    const handleDelete = async (rowId: number) => {
        if (!rowId) return;
        try {
            const { data } = await axios.delete(`/market-segments/${rowId}`);
            if (data.exists) {
                toast.warning(`Cannot delete market segment #${rowId} — it still has projects.`);
                return;
            }
            refetch();
            toast.success(data.message);
            return true;
        } catch (error) {
            toast.warning(`Error: ${error}.`);
            return false;
        }
    };

    const columns: ColumnDef<MarketSegment>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="ID" className="justify-center" />,
            cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
            enableHiding: false,
            meta: 'ID',
        },
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
                                    handleSave(rowId, editedValue);
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
                        <div className="flex items-center gap-2">
                            <Button
                                size="icon"
                                variant="outline"
                                className="size-8 text-green-600 hover:text-green-800"
                                onClick={() => handleSave(rowId, editedValue)}
                            >
                                <Save />
                            </Button>
                            <Button
                                size="icon"
                                variant="outline"
                                className="size-8 text-red-600 hover:text-red-800"
                                onClick={() => {
                                    setEditingRowId(null);
                                    setEditedValue('');
                                }}
                            >
                                <X />
                            </Button>
                        </div>
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
                <div className="absolute top-4 right-4 z-10">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button title="Add new market segment" variant="outline" className="size-8">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Market Segment</DialogTitle>
                                <DialogDescription>Enter a new market segment description and click Save.</DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="desc">Market Segment</Label>
                                <Input
                                    id="desc"
                                    value={newSegmentDesc}
                                    onChange={(e) => setNewSegmentDesc(e.target.value)}
                                    placeholder="e.g. Retail, Hospitality..."
                                    autoFocus
                                />
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={async () => {
                                        if (!newSegmentDesc.trim()) return;

                                        try {
                                            const response = await axios.post('/market-segments', {
                                                market_segment_desc: newSegmentDesc,
                                            });

                                            if (response.data) {
                                                refetch();
                                                toast.success(`Market segment added!`);
                                                setNewSegmentDesc('');
                                                setIsDialogOpen(false);
                                            }
                                        } catch (err) {
                                            toast.error('Failed to add segment.');
                                            console.error(err);
                                        }
                                    }}
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Market Segments</h2>
                    <p className="text-muted-foreground">Project and opportunity segments can be added or editted here.</p>
                </div>
                <div className="flex flex-col gap-4">
                    {!isLoading && !isFetching ? <DataTableMain table={table} columns={columns} /> : <DataTableSkeleton rows={5} cols={5} />}
                </div>
            </div>
        </div>
    );
}
