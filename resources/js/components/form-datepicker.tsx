import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

interface FormDatePickerProps {
    className?: string;
    id: string;
    name?: string;
    value?: string | null;
    placeholder?: string;
    disabled?: boolean;
    onChange: (date: string | null) => void;
    startMonth?: Date;
    endMonth?: Date;
    captionLayout?: 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';
    formatValue?: (date: Date) => string;
}

export default function FormDatePicker({
    id,
    value,
    onChange,
    placeholder = 'Select date',
    disabled,
    startMonth,
    endMonth,
    captionLayout = 'dropdown',
    formatValue = (d) => d.toLocaleDateString(),
    className,
}: FormDatePickerProps) {
    const [open, setOpen] = useState(false);
    const display = value ? formatValue(new Date(value)) : placeholder;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    id={id}
                    disabled={disabled}
                    className={cn('w-full justify-between font-normal', className)}
                    aria-haspopup="dialog"
                    aria-expanded={open}
                >
                    {display}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value ? new Date(value) : undefined}
                    captionLayout={captionLayout}
                    startMonth={startMonth}
                    endMonth={endMonth}
                    onSelect={(date) => {
                        onChange(date ? date.toDateString().split('T')[0] : null);
                        setOpen(false);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
