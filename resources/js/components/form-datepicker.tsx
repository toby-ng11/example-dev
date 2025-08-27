import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';

interface FormDatePickerProps {
    className?: string;
    id: string;
    name?: string;
    value?: Date;
    placeholder?: string;
}

export default function FormDatePicker({ className, id, name, placeholder = "Select date" }: FormDatePickerProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
        <>
            <Input name={name ?? id} type="hidden" value={date ? date.toISOString().split('T')[0] : ''} />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button type="button" variant="outline" id={id} className={cn('justify-between font-normal', className)}>
                        {date ? date.toLocaleDateString() : placeholder}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </>
    );
}
