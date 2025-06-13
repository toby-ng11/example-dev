import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, BookUser, Folder, Home, LayoutGrid, ShieldCheck } from 'lucide-react';
import AppLogo from './app-logo';

function getMainNavItems(userRole: string | null): NavItem[] {
    const base: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Project Dashboard',
            href: '/projects',
            icon: Home,
        },
        {
            title: 'Architect Dashboard',
            href: '/architects',
            icon: BookUser,
        },
        {
            title: 'Quote Dashboard',
            href: '/quotes',
            icon: LayoutGrid,
        },
    ];

    if (userRole === 'admin') {
        base.unshift({ title: 'Admin Dashboard', href: '/admin', icon: ShieldCheck });
    }

    return [...base]; // ensure return is always a fresh array
}

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { props } = usePage();

    const userRole = props.userRole as string | null;

    const mainNavItems = getMainNavItems(userRole);

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
