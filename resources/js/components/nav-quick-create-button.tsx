import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { PlusCircle } from 'lucide-react';
import { useGlobalDialogs } from './dialogs/dialog-context';

export default function NavQuickCreateButton() {
    const { isMobile } = useSidebar();
    const { open } = useGlobalDialogs();

    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu key="Quick Create">
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                tooltip="Quick Create"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground duration-200 ease-linear"
                            >
                                <PlusCircle />
                                Quick Create
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align={isMobile ? 'end' : 'start'} className="w-56">
                            <DropdownMenuItem>Opportunity</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => open('createProject')}>Project</DropdownMenuItem>
                            <DropdownMenuItem>Quote</DropdownMenuItem>
                            <DropdownMenuItem>Architect</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
