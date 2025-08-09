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
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';

interface RowOptionsProps {
    rowId?: string | number;
    canCopy?: boolean;
    canFavorite?: boolean;
    onEdit?: () => void;
    onCopy?: () => void;
    onFavorite?: () => void;
    onDelete?: () => Promise<boolean | undefined>;
    deleteAlertDescription?: string;
}

export default function DataTableRowOptions({
    rowId,
    canCopy = false,
    canFavorite = false,
    onEdit,
    onCopy,
    onFavorite,
    onDelete,
    deleteAlertDescription,
}: RowOptionsProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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
                            {deleteAlertDescription ?? `This action cannot be undone. This will permanently delete the field #${rowId}.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={loading}
                            className="bg-destructive dark:bg-destructive/50 dark:hover:bg-destructive/60 hover:bg-destructive/90 text-white"
                            onClick={async () => {
                                setLoading(true);
                                const success = await onDelete?.();
                                if (success) {
                                    setOpen(false);
                                }
                                setLoading(false);
                            }}
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
