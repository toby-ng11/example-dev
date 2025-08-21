import { DataTableColumnHeader } from '@/components/table-header';
import DataTableMain from '@/components/table-main';
import DataTableRowOptions from '@/components/table-row-options';
import { DataTableSkeleton } from '@/components/table-skeleton';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTanStackQuery } from '@/hooks/use-query';
import { useForm } from '@inertiajs/react';
import { ColumnDef, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import axios from 'axios';
import { LoaderCircle, Plus, Save, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface Status {
    id: number;
    status_desc: string;
    project_flag: 'Y' | 'N' | null;
    quote_flag: 'Y' | 'N' | null;
}

type StatusForm = {
    status_desc: string;
    project_flag: string;
    quote_flag: string;
};

export default function StatusesTable() {
    const [sorting, setSorting] = useState<SortingState>([{ id: 'status_desc', desc: false }]);
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [editedValue, setEditedValue] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const ENDPOINT = '/statuses';
    const qKey = ['admin', 'statuses'];

    const { data: statuses = [], isLoading, isFetching, refetch } = useTanStackQuery<Status>(ENDPOINT, qKey);

    const handleSave = async (rowId: number, editedValue: string) => {
        try {
            if (rowId === 0) {
                const response = await axios.post(ENDPOINT, {
                    status_desc: editedValue,
                });

                if (response.data) {
                    refetch();
                    toast.success(`Saved: ${editedValue}.`);
                } else {
                    toast.error(`Error! Please check log for more detail.`);
                }
            } else {
                const { data } = await axios.put(`${ENDPOINT}/${rowId}`, {
                    status_desc: editedValue,
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
            const { data } = await axios.delete(`${ENDPOINT}/${rowId}`);
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

    const handleToggle = async (rowId: number, flagName: 'project_flag' | 'quote_flag', newChecked: boolean) => {
        setLoading(true);
        try {
            const response = await axios.put(`${ENDPOINT}/${rowId}`, {
                [flagName]: newChecked ? 'Y' : 'N',
            });

            const { success, message } = response.data;

            if (success) {
                toast.success(message || 'Updated');
                refetch();
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

    const { data, setData, post, processing, reset } = useForm<StatusForm>({
        status_desc: '',
        project_flag: '',
        quote_flag: '',
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        post(ENDPOINT, {
            onSuccess: () => {
                toast.success('Added successfully');
                setIsDialogOpen(false);
                reset();
                refetch();
            },
            onError: (errors) => {
                toast.error(`Error saving: ${errors}`);
            },
        });
    };

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <div className="flex flex-1 flex-col gap-4 p-2">
                <div className="absolute top-4 right-4 z-10">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button title="Add new status" variant="outline" className="size-8">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>

                        <DialogContent className='sm:max-w-100'>
                            <DialogHeader>
                                <DialogTitle>Add Status</DialogTitle>
                                <DialogDescription>Enter a new status description, then choose at least a flag and click Save.</DialogDescription>
                            </DialogHeader>
                            <form className="flex flex-col gap-6" onSubmit={submit}>
                                <div className="grid gap-2">
                                    <Label htmlFor="status_desc">Status</Label>
                                    <Input
                                        id="status_desc"
                                        value={data.status_desc}
                                        onChange={(e) => setData('status_desc', e.target.value)}
                                        placeholder="e.g. Not completed, ..."
                                        autoFocus
                                        required
                                    />
                                </div>

                                <div className="flex items-start gap-3">
                                    <Checkbox
                                        id="project_flag"
                                        checked={data.project_flag === 'Y'}
                                        onCheckedChange={(checked) => setData('project_flag', checked ? 'Y' : 'N')}
                                    />
                                    <Label htmlFor="project_flag">Project Flag</Label>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Checkbox
                                        id="quote_flag"
                                        checked={data.quote_flag === 'Y'}
                                        onCheckedChange={(checked) => setData('quote_flag', checked ? 'Y' : 'N')}
                                    />
                                    <Label htmlFor="quote_flag">Quote Flag</Label>
                                </div>

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsDialogOpen(false);
                                            reset();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing || !data.status_desc.trim() || (!data.project_flag && !data.quote_flag)}
                                    >
                                        Save
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

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
