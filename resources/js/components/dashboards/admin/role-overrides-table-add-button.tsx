import { AutoCompleteInput } from '@/components/auto-complete';
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
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { type RoleOverride } from './role-overrides-table';

interface RoleOverrideAddButtonProps {
    endpoint: string;
    queryKey: (string | number | boolean)[];
}

export default function RoleOverrideAddButton({ endpoint, queryKey }: RoleOverrideAddButtonProps) {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, post, processing, reset } = useForm<RoleOverride>({
        user_id: '',
        override_role: '',
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        post(endpoint, {
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey });
                toast.success('Added successfully');
                setIsDialogOpen(false);
                reset();
            },
            onError: (errors) => {
                toast.error(`Error saving: ${errors.error}`);
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
                            If you want to give a user different role than the default one in All Users table, add it here. Please choose an exact
                            user ID you want to override.
                        </DialogDescription>
                    </DialogHeader>

                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="user_id">User ID</Label>
                                <AutoCompleteInput<User>
                                    fetchUrl="/lapi/users"
                                    placeholder="Search for a user..."
                                    minLength={2}
                                    queryParamName="pattern"
                                    limitParamName="limit"
                                    limit={10}
                                    renderItem={(item) => (
                                        <div className="flex flex-col">
                                            <strong>{item.name}</strong>
                                            <span className="text-muted-foreground text-sm">{item.name}</span>
                                        </div>
                                    )}
                                    inputId="user_id"
                                    inputValue={data.user_id}
                                    onInputValueChange={(val) => setData('user_id', val)}
                                    onSelect={(item) => {
                                        setData('user_id', item.id);
                                        setData('override_role', item.p2q_system_role);
                                    }}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="override_role">New Role</Label>
                                <Select value={data.override_role} onValueChange={(val) => setData('override_role', val)}>
                                    <SelectTrigger id="override_role">
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
    );
}
