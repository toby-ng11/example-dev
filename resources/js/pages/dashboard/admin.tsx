import MarketSegmentTable from '@/components/dashboards/admin/marktet-segments-table';
import ProjectsTable from '@/components/dashboards/admin/projects-table';
import QuotesTable from '@/components/dashboards/admin/quotes-table';
import RoleOverrideTable from '@/components/dashboards/admin/role-overrides-table';
import StatusesTable from '@/components/dashboards/admin/statuses-table';
import UsersTable from '@/components/dashboards/admin/users-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard/admin',
    },
];

export default function AdminDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
                    <MarketSegmentTable />
                    <StatusesTable />
                    <RoleOverrideTable />
                </div>

                <UsersTable />
                <ProjectsTable />
                <QuotesTable />
            </div>
        </AppLayout>
    );
}
