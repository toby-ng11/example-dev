import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ProjectTable() {
    const headers = ['ID', 'Ext. ID', 'Name', 'Owner', 'Shared', 'Create Date', 'Due Date', 'Architect', 'Market Segment', 'Status', 'Make Quote'];

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <h2 className="mb-4 text-xl font-semibold">All Projects</h2>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {headers.map((title, index) => (
                                <TableHead key={index} className="text-center">
                                    {title}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>{/* No data rows yet */}</TableBody>
                </Table>
            </div>
        </div>
    );
}
