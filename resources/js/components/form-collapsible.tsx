import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface FormCollapsibleProps {
    children: ReactNode;
    label?: string;
}

export default function FormCollapsible({ children, label = 'Collapsible' }: FormCollapsibleProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <Button variant="outline">
                    {label}
                    {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent
                className={cn(
                    'overflow-hidden',
                    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2',
                    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2',
                )}
            >
                {children}
            </CollapsibleContent>
        </Collapsible>
    );
}
