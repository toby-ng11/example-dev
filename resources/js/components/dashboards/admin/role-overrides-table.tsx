import { DataTableColumnHeader } from '@/components/table-header';
import DataTableMain from '@/components/table-main';
import DataTableRowDeleteButton from '@/components/table-row-delete-button';
import { DataTableSkeleton } from '@/components/table-skeleton';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTanStackQuery } from '@/hooks/use-query';
import { useForm } from '@inertiajs/react';
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
import { LoaderCircle, Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface RoleOverride {
    user_id: string;
    override_role: string;
}

type RoleOverrideForm = {
    user_id: string;
    override_role: string;
};

export default function RoleOverrideTable() {
    const [sorting, setSorting] = useState<SortingState>([{ id: 'user_id', desc: false }]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const ENDPOINT = '/role-overrides';
    const qKey = ['admin', 'role-overrides'];

    const { data: roleOverrides = [], isLoading, isFetching, refetch } = useTanStackQuery<RoleOverride>(ENDPOINT, qKey);

    const handleSave = async (rowId: string, editedValue: string) => {
        try {
            const { data } = await axios.put(`${ENDPOINT}/${rowId}`, {
                override_role: editedValue,
            });
            if (data) {
                toast.success(data.message);
                refetch();
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
            refetch();
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

    const { data, setData, post, processing, reset } = useForm<RoleOverrideForm>({
        user_id: '',
        override_role: '',
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

    const handleDialogOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            reset();
        }
    };

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <div className="flex flex-1 flex-col gap-4 p-2">
                <div className="absolute top-4 right-4 z-10">
                    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                        <DialogTrigger asChild>
                            <Button title="Add new market segment" variant="outline" className="size-8">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Override a user Role</DialogTitle>
                                <DialogDescription>
                                    If you want to give a user different role than the default one in All Users table, add it here. Please choose an
                                    exact user ID you want to override.
                                </DialogDescription>
                            </DialogHeader>

                            <form className="flex flex-col gap-6" onSubmit={submit}>
                                <div className="flex flex-col gap-6 md:flex-row">
                                    <div className="grid gap-2">
                                        <Label htmlFor="user_id">User ID</Label>
                                        <Input
                                            id="user_id"
                                            value={data.user_id}
                                            onChange={(e) => setData('user_id', e.target.value)}
                                            defaultValue=""
                                            placeholder="Search for a user..."
                                            autoFocus
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="override_role">New Role</Label>
                                        <Select value={data.override_role} onValueChange={(val) => setData('override_role', val)}>
                                            <SelectTrigger id="override_role" className="w-full md:w-[220px]">
                                                <SelectValue placeholder="Select a role..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="manager">Manager</SelectItem>
                                                <SelectItem value="sales">Sales</SelectItem>
                                                <SelectItem value="guest">Guest</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={processing || !data.user_id.trim() || !data.override_role.trim()}>
                                        Save
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Role Override</h2>
                    <p className="text-muted-foreground">
                        Override a user's role. All default role are shown in <b>All Users</b> table.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    {!isLoading && !isFetching ? <DataTableMain table={table} columns={columns} /> : <DataTableSkeleton rows={5} cols={5} />}
                </div>
            </div>
        </div>
    );
}
