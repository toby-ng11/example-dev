import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';

interface DataTableRowEditingButtonsProps {
    saveEdit: () => Promise<void>;
    cancel: () => void;
}

export default function DataTableRowEditingButtons({ saveEdit, cancel }: DataTableRowEditingButtonsProps) {
    return (
        <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" className="size-8 text-green-600 hover:text-green-800" onClick={saveEdit}>
                <Save />
            </Button>
            <Button size="icon" variant="outline" className="size-8 text-red-600 hover:text-red-800" onClick={cancel}>
                <X />
            </Button>
        </div>
    );
}
