import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface RowOptionsProps {
    rowId?: string | number;
    canCopy?: boolean;
    canFavorite?: boolean;
    onEdit?: () => void;
    onCopy?: () => void;
    onFavorite?: () => void;
}

export default function DataTableRowOptions({ rowId, canCopy = false, canFavorite = false, onEdit, onCopy, onFavorite }: RowOptionsProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        if (!rowId) return;
        setLoading(true);
        try {
            const { data } = await axios.get(`/check-exist/projects?marketsegment=${rowId}`);
            if (data.exists) {
                toast.warning(`Cannot delete market segment #${rowId} — it still has projects.`);
                return;
            }
            await axios.delete(`/market-segments/${rowId}`);
            setOpen(false);
        } catch (error) {
            toast.warning(`Error: ${error}.`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
                        <EllipsisVertical />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                    {canCopy && <DropdownMenuItem onClick={onCopy}>Make a copy</DropdownMenuItem>}
                    {canFavorite && <DropdownMenuItem onClick={onFavorite}>Favorite</DropdownMenuItem>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setOpen(true)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the market segment.
                            <span className="font-medium"> #{rowId}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={loading}
                            className="bg-destructive dark:bg-destructive/50 dark:hover:bg-destructive/60 hover:bg-destructive/90 text-white"
                            onClick={handleDelete}
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
