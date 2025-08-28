import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTanStackQuery } from '@/hooks/use-query';
import { type Address, type Architect, type Branches, Companies, type MarketSegment, SharedData, type Specifier, type Status } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { AutoCompleteInput } from '../auto-complete';
import FormCollapsible from '../form-collapsible';
import FormDatePicker from '../form-datepicker';

interface ProjectFormProps {
    id: string;
    isCreating?: boolean;
}

interface ProjectForm {
    project_name: string;
    project_address: string;
    location_id: string;
    due_date: string | null;
    require_date: string | null;
    status: Status;
    market_segment: MarketSegment;
    architect: Architect;
    specifier: Specifier;
    architect_address: Address;
    specifier_address: Address;
}

export default function ProjectForm({ id }: ProjectFormProps) {
    const { user } = usePage<SharedData>().props.auth;
    const branches = useTanStackQuery<Branches>('/lapi/branches', ['branches']);
    const companies = useTanStackQuery<Companies>('/lapi/branches?type=companies', ['companies']);
    const statuses = useTanStackQuery<Status>('/lapi/statuses?type=project', ['project-statuses']);
    const marketSegments = useTanStackQuery<MarketSegment>('/lapi/market-segments', ['market-segments']);

    const [selectedArchitectId, setSelectedArchitectId] = useState<string | null>(null);

    const architectAddresses = useTanStackQuery<Address>(
        selectedArchitectId ? `/architects/${selectedArchitectId}/addresses` : '',
        ['architect-addresses', selectedArchitectId],
        !!selectedArchitectId,
    );

    const form = useForm<ProjectForm>({
        project_name: '',
        project_address: '',
        location_id: user.default_location_id ?? '',
        due_date: null,
        require_date: null,
        status: {
            id: '',
        },
        market_segment: {
            id: '',
        },
        architect: {
            id: '',
            architect_name: '',
            company_id: '',
            class_id: '',
            architect_rep_id: '',
            architect_type_id: '',
        },
        architect_address: {
            id: '',
            name: '',
            phys_address1: '',
            phys_address2: '',
            phys_city: '',
            phys_state: '',
            phys_postal_code: '',
            phys_country: '',
            central_phone_number: '',
            email_address: '',
            url: '',
        },
        specifier: {
            id: '',
        },
        specifier_address: {
            id: '',
        },
    });

    // Auto select the first address
    useEffect(() => {
        if (!selectedArchitectId || architectAddresses.isFetching) return;
        const list = architectAddresses.data ?? [];
        if (list.length > 0 && !form.data.architect_address.id) {
            const a = list[0];
            form.setData('architect_address', {
                id: a.id,
                name: a.name,
                phys_address1: a.phys_address1,
                phys_address2: a.phys_address2,
                phys_city: a.phys_city,
                phys_state: a.phys_state,
                phys_postal_code: a.phys_postal_code,
                phys_country: a.phys_country,
                central_phone_number: a.central_phone_number,
                email_address: a.email_address,
                url: a.url,
            });
        }
    }, [architectAddresses.data, architectAddresses.isFetching, form, selectedArchitectId]);

    return (
        <form id={id}>
            <div className="flex max-h-[500px] flex-col gap-6 overflow-y-auto p-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="project_name">Name</Label>
                        <Input
                            id="project_name"
                            value={form.data.project_name}
                            onChange={(e) => form.setData('project_name', e.target.value)}
                            autoFocus
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="project_address">Location</Label>
                        <Input
                            id="project_address"
                            value={form.data.project_address}
                            onChange={(e) => form.setData('project_address', e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location_id">Branch</Label>
                        <Select value={form.data.location_id} onValueChange={(val) => form.setData('location_id', val)}>
                            <SelectTrigger id="location_id">
                                <SelectValue placeholder="Select a branch..." />
                            </SelectTrigger>
                            <SelectContent>
                                {branches.data?.map((branch) => (
                                    <SelectItem key={branch.location_id} value={branch.location_id}>
                                        {branch.branch_description}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="status_id">Status</Label>
                        <Select value={form.data.status.id} onValueChange={(val) => form.setData('status.id', val)}>
                            <SelectTrigger id="status_id">
                                <SelectValue placeholder="Select a project status..." />
                            </SelectTrigger>
                            <SelectContent>
                                {statuses.data?.map((status) => (
                                    <SelectItem key={status.id} value={status.id}>
                                        {status.status_desc}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="market_segment_id">Market Segment</Label>
                        <Select value={form.data.market_segment.id} onValueChange={(val) => form.setData('market_segment.id', val)}>
                            <SelectTrigger id="market_segment_id">
                                <SelectValue placeholder="Select a project segment..." />
                            </SelectTrigger>
                            <SelectContent>
                                {marketSegments.data?.map((marketSegment) => (
                                    <SelectItem key={marketSegment.id} value={marketSegment.id}>
                                        {marketSegment.market_segment_desc}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="due_date">Tender Due Date</Label>
                        <FormDatePicker id="require_date" value={form.data.due_date} onChange={(d) => form.setData('due_date', d)} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="require_date">Required Date</Label>
                        <FormDatePicker id="require_date" value={form.data.require_date} onChange={(d) => form.setData('require_date', d)} />
                    </div>
                </div>

                <div className="h-[1px] border"></div>

                <FormCollapsible label="Architect">
                    <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                        <Input value={form.data.architect?.id} onChange={(e) => form.setData('architect.id', e.target.value)} type="hidden" />

                        <div className="grid gap-2">
                            <Label htmlFor="architect_name">Architect Name</Label>
                            <AutoCompleteInput<Architect>
                                fetchUrl="/lapi/architects"
                                placeholder="Search for an architect..."
                                minLength={2}
                                queryParamName="pattern"
                                limitParamName="limit"
                                limit={10}
                                renderItem={(item) => (
                                    <div className="flex flex-col">
                                        <strong>{item.architect_name}</strong>
                                        <span className="text-muted-foreground text-sm">
                                            {item.architect_rep_id} - {item.company_id}
                                        </span>
                                    </div>
                                )}
                                inputId="architect_name"
                                inputValue={form.data.architect.architect_name}
                                onInputValueChange={(val) => form.setData('architect.architect_name', val)}
                                onSelect={(item) => {
                                    form.setData('architect', {
                                        id: item.id,
                                        architect_name: item.architect_name,
                                        company_id: item.company_id,
                                        architect_rep_id: item.architect_rep_id,
                                        class_id: item.class_id,
                                    });
                                    setSelectedArchitectId(item.id);
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="architect_company_id">Branch</Label>
                            <Select value={form.data.architect.company_id} onValueChange={(val) => form.setData('architect.company_id', val)}>
                                <SelectTrigger id="architect_company_id">
                                    <SelectValue placeholder="Select a branch..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {companies.data?.map((branch) => (
                                        <SelectItem key={branch.company_id} value={branch.company_id}>
                                            {branch.company_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="architect_rep_id">Architect Rep.</Label>
                            <Input
                                id="architect_rep_id"
                                value={form.data.architect.architect_rep_id}
                                onChange={(e) => form.setData('architect.architect_rep_id', e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="architect_class_id">Class</Label>
                            <Input
                                id="architect_class_id"
                                value={form.data.architect.class_id}
                                onChange={(e) => form.setData('architect.class_id', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="my-6 h-[1px] border"></div>

                    <FormCollapsible label="Address">
                        <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="address_list">Address List</Label>
                                <Select
                                    value={form.data.architect_address.id}
                                    onValueChange={(val) => {
                                        const select = architectAddresses.data?.find((address) => address.id === val);
                                        if (select) {
                                            form.setData('architect_address', {
                                                id: select.id,
                                                name: select.name,
                                                phys_address1: select.phys_address1,
                                                phys_address2: select.phys_address2,
                                                phys_city: select.phys_city,
                                                phys_state: select.phys_state,
                                                phys_postal_code: select.phys_postal_code,
                                                phys_country: select.phys_country,
                                                central_phone_number: select.central_phone_number,
                                                email_address: select.email_address,
                                                url: select.url,
                                            });
                                        }
                                    }}
                                >
                                    <SelectTrigger className="truncate" id="address_list" disabled={!selectedArchitectId}>
                                        <SelectValue
                                            placeholder={
                                                !selectedArchitectId
                                                    ? 'Please search for an architect first...'
                                                    : architectAddresses.isFetching
                                                      ? 'Loading addresses…'
                                                      : (architectAddresses.data?.length ?? 0) === 0
                                                        ? 'No addresses found. Fill in the fields to create a new address.'
                                                        : 'Select an address'
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {architectAddresses.data?.map((address) => (
                                            <SelectItem key={address.id} value={address.id}>
                                                {address.name} - {address.phys_address1}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address_name">Address Nickname</Label>
                                <Input
                                    id="address_name"
                                    value={form.data.architect_address.name}
                                    onChange={(e) => form.setData('architect_address.name', e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phys_address1">Address 1</Label>
                                <Input
                                    id="phys_address1"
                                    value={form.data.architect_address.phys_address1}
                                    onChange={(e) => form.setData('architect_address.phys_address1', e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phys_address2">Address 2</Label>
                                <Input
                                    id="phys_address2"
                                    value={form.data.architect_address.phys_address2}
                                    onChange={(e) => form.setData('architect_address.phys_address2', e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phys_city">City</Label>
                                <Input
                                    id="phys_city"
                                    value={form.data.architect_address.phys_city}
                                    onChange={(e) => form.setData('architect_address.phys_city', e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phys_state">Province</Label>
                                <Input
                                    id="phys_state"
                                    value={form.data.architect_address.phys_state}
                                    onChange={(e) => form.setData('architect_address.phys_state', e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phys_postal_code">Postal Code</Label>
                                <Input
                                    id="phys_postal_code"
                                    value={form.data.architect_address.phys_postal_code}
                                    onChange={(e) => form.setData('architect_address.phys_postal_code', e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phys_country">Country</Label>
                                <Input
                                    id="phys_country"
                                    value={form.data.architect_address.phys_country}
                                    onChange={(e) => form.setData('architect_address.phys_country', e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="central_phone_number">Phone</Label>
                                <Input
                                    id="central_phone_number"
                                    value={form.data.architect_address.central_phone_number}
                                    onChange={(e) => form.setData('architect_address.central_phone_number', e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email_address">Email</Label>
                                <Input
                                    id="email_address"
                                    value={form.data.architect_address.email_address}
                                    onChange={(e) => form.setData('architect_address.email_address', e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="url">URL</Label>
                                <Input
                                    id="url"
                                    value={form.data.architect_address.url}
                                    onChange={(e) => form.setData('architect_address.url', e.target.value)}
                                />
                            </div>
                        </div>
                    </FormCollapsible>

                    <div className="my-6 h-[1px] border"></div>

                    <FormCollapsible label="Specifier">
                        <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                            <Input name="specifier_id" type="hidden" />
                            <Input name="specifier_address_id" type="hidden" />

                            <div className="grid gap-2">
                                <Label htmlFor="specifier_name">Specifier List</Label>
                                <Input id="specifier_name" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="specifier_first_name">First Name</Label>
                                <Input id="specifier_first_name" name="specifier_first_name" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="specifier_job_title">Job Title</Label>
                                <Input id="specifier_job_title" name="specifier_job_title" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="specifier_phone_number">Phone Number</Label>
                                <Input id="specifier_phone_number" name="specifier_phone_number" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="specifier_email">Email</Label>
                                <Input id="specifier_email" name="specifier_email" />
                            </div>
                        </div>
                    </FormCollapsible>
                </FormCollapsible>

                <div className="h-[1px] border"></div>

                <FormCollapsible label="Contractors">
                    <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2 xl:gap-6">
                        <Input name="general_contractor_id" type="hidden" />
                        <Input name="awarded_contractor_id" type="hidden" />

                        <div className="grid gap-2">
                            <Label htmlFor="general_contractor_name">General Contractor</Label>
                            <Input id="general_contractor_name" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="awarded_contractor_name">Awarded Contractor</Label>
                            <Input id="awarded_contractor_name" />
                        </div>
                    </div>
                </FormCollapsible>
            </div>
        </form>
    );
}
