import { DataTableColumnHeader } from '@/components/table-header';
import DataTableRowOptions from '@/components/table-row-options';
import { DataTableLoadingSpinner } from '@/components/table-spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    ColumnDef,
    flexRender,
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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface MarketSegment {
    id: number;
    market_segment_desc: string;
}

export default function MarketSegmentTable() {
    const [data, setData] = useState<MarketSegment[]>([]);
    const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: false }]);
    const [isReady, setIsReady] = useState(false);
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [editedValue, setEditedValue] = useState<string>('');
    const [isCreatingNew, setIsCreatingNew] = useState(false);

    useEffect(() => {
        axios.get('/market-segments').then((res) => {
            setData(res.data);
            setIsReady(true);
        });
    }, []);

    const handleSave = async (rowId: number, editedValue: string) => {
        try {
            if (rowId === 0) {
                const response = await axios.post('/market-segments', {
                    market_segment_desc: editedValue,
                });

                const newSegment = response.data;

                // Replace temp row with real one
                setData((prev) => [newSegment, ...prev.filter((row) => row.id !== 0)]);
                toast.success(`Saved: ${editedValue}.`);
            } else {
                const { data } = await axios.put(`/market-segments/${rowId}`, {
                    market_segment_desc: editedValue,
                });
                if (data) {
                    setEditingRowId(null);
                    setEditedValue('');
                    toast.success(data.message);
                    setData((prev) => prev.map((row) => (row.id === rowId ? { ...row, market_segment_desc: editedValue } : row)));
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
            setData((prev) => prev.filter((row) => row.id !== rowId));
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
                                    if (editingRowId === 0) {
                                        setData((prev) => prev.filter((row) => row.id !== 0));
                                        setIsCreatingNew(false);
                                    }
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
        data,
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
                    <Button
                        title="Add new shared user"
                        variant="outline"
                        className="size-8"
                        onClick={() => {
                            if (isCreatingNew) return;

                            const tempRow = {
                                id: 0,
                                market_segment_desc: '',
                            };

                            setData((prev) => [tempRow, ...prev]);
                            setEditedValue('');
                            setEditingRowId(0);
                            setIsCreatingNew(true);
                        }}
                    >
                        <Plus />
                    </Button>
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Market Segments</h2>
                    <p className="text-muted-foreground">Project and opportunity segments can be added or editted here.</p>
                </div>
                <div className="flex flex-col gap-4">
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
            </div>
        </div>
    );
}
