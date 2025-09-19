import DataTableMain from '@/components/table-main';
import { DataTablePagination } from '@/components/table-pagination';
import { DataTableSkeleton } from '@/components/table-skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/hooks/use-debounce';
import { useTanStackQuery } from '@/hooks/use-query';
import { cn } from '@/lib/utils';
import { MarketSegment, Project } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    PaginationState,
    useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import { Check, Plus, PlusCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

interface TestProjectTable {
    projects: {
        data: Project[];
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export default function TestProjectTable() {
    const columns = useMemo<ColumnDef<Project>[]>(
        () => [
            {
                header: 'ID',
                accessorKey: 'id',
            },
            {
                header: 'Ext. ID',
                accessorKey: 'project_id_ext',
            },
            {
                header: 'Name',
                accessorKey: 'project_name',
            },
            {
                header: 'Address',
                accessorKey: 'project_address',
            },
            {
                header: 'Brach',
                accessorKey: 'centura_location_id',
            },
            {
                header: 'Segment',
                accessorKey: 'market_segment_id',
            },
        ],
        [],
    );

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const debouncedFilters = useDebounce(columnFilters, 300);

    const ENDPOINT = '/projects';
    //const columnVisibilityPref = '/lapi/preferences/admin-users-table-column-visibility';
    const qKey = ['home', 'projects', pagination, debouncedFilters];

    const users = useQuery({
        queryKey: qKey,
        queryFn: async () => {
            const params: Record<string, string | number> = {
                page: pagination.pageIndex + 1,
                size: pagination.pageSize,
            };

            debouncedFilters.forEach((filter) => {
                const { id, value } = filter;

                switch (id) {
                    case 'project_name':
                        if (value && typeof value === 'string' && value.trim()) {
                            params.search = value.trim();
                        }
                        break;
                }
            });

            const res = await axios.get<TestProjectTable>(ENDPOINT, { params });
            return {
                rows: res.data.projects.data,
                pageCount: res.data.projects.last_page,
                rowCount: res.data.projects.total,
            };
        },
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const marketSegments = useTanStackQuery<MarketSegment>('/lapi/market-segments', ['market-segments']);
    const marketSegmentOptions = useMemo(() => {
        return (
            marketSegments.data?.map((segment) => ({
                label: segment.market_segment_desc,
                value: segment.id.toString(),
                icon: Plus,
            })) || []
        );
    }, [marketSegments.data]);

    const defaultData = useMemo(() => [], []);

    const table = useReactTable({
        data: users.data?.rows ?? defaultData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        rowCount: users.data?.rowCount,
        manualPagination: true,
        manualFiltering: true,
        state: {
            pagination,
            columnFilters,
        },
    });

    const selectedValues = new Set(table.getColumn('market_segment_id')?.getFilterValue() as string[]);

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-full flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
            <div className="flex flex-1 flex-col gap-4 p-2">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">All Users</h2>
                    <p className="text-muted-foreground">All users across all branches.</p>
                </div>
                {users.isLoading ? (
                    <DataTableSkeleton rows={10} cols={5} />
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                            <Input
                                placeholder="Search projects name..."
                                value={(table.getColumn('project_name')?.getFilterValue() as string) ?? ''}
                                onChange={(e) => {
                                    table.getColumn('project_name')?.setFilterValue(e.target.value);
                                    // Reset pagination when search changes
                                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                                }}
                                className="h-8 w-[150px] lg:w-[250px]"
                            />

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 border-dashed">
                                        <PlusCircle />
                                        Market Segment
                                        {selectedValues?.size > 0 && (
                                            <>
                                                <Separator orientation="vertical" className="mx-2 h-4" />
                                                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                                    {selectedValues.size}
                                                </Badge>
                                                <div className="hidden gap-1 lg:flex">
                                                    {selectedValues.size > 2 ? (
                                                        <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                                            {selectedValues.size} selected
                                                        </Badge>
                                                    ) : (
                                                        marketSegmentOptions
                                                            .filter((option) => selectedValues.has(option.value))
                                                            .map((option) => (
                                                                <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
                                                                    {option.label}
                                                                </Badge>
                                                            ))
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-fit max-w-[400px] p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Market Segment" />
                                        <CommandList>
                                            <CommandEmpty>No results found.</CommandEmpty>
                                            <CommandGroup>
                                                {marketSegmentOptions.map((option) => {
                                                    const isSelected = selectedValues.has(option.value);
                                                    return (
                                                        <CommandItem
                                                            key={option.value}
                                                            onSelect={() => {
                                                                if (isSelected) {
                                                                    selectedValues.delete(option.value);
                                                                } else {
                                                                    selectedValues.add(option.value);
                                                                }
                                                                const filterValues = Array.from(selectedValues);
                                                                table
                                                                    .getColumn('market_segment_id')
                                                                    ?.setFilterValue(filterValues.length ? filterValues : undefined);
                                                            }}
                                                        >
                                                            <div
                                                                className={cn(
                                                                    'flex size-4 items-center justify-center rounded-[4px] border',
                                                                    isSelected
                                                                        ? 'bg-primary border-primary text-primary-foreground'
                                                                        : 'border-input [&_svg]:invisible',
                                                                )}
                                                            >
                                                                <Check className="text-primary-foreground size-3.5" />
                                                            </div>
                                                            {option.icon && <option.icon className="text-muted-foreground size-4" />}
                                                            <span>{option.label}</span>
                                                            {table.getColumn('market_segment_id')?.getFacetedUniqueValues().get(option.value) && (
                                                                <span className="text-muted-foreground ml-auto flex size-4 items-center justify-center font-mono text-xs">
                                                                    {table.getColumn('market_segment_id')?.getFacetedUniqueValues().get(option.value)}
                                                                </span>
                                                            )}
                                                        </CommandItem>
                                                    );
                                                })}
                                            </CommandGroup>
                                            {selectedValues.size > 0 && (
                                                <>
                                                    <CommandSeparator />
                                                    <CommandGroup>
                                                        <CommandItem
                                                            onSelect={() => table.getColumn('market_segment_id')?.setFilterValue(undefined)}
                                                            className="justify-center text-center"
                                                        >
                                                            Clear filters
                                                        </CommandItem>
                                                    </CommandGroup>
                                                </>
                                            )}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <DataTableMain
                            key={`table-${pagination.pageIndex}-${JSON.stringify(debouncedFilters)}`}
                            pageSize={pagination.pageSize}
                            table={table}
                            columns={columns}
                            isFetching={users.isFetching}
                        />

                        <DataTablePagination table={table} />
                    </div>
                )}
            </div>
        </div>
    );
}
