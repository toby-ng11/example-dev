import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTanStackQuery } from '@/hooks/use-query';
import { type Address, type Architect, type Branches, type MarketSegment, SharedData, type Specifier, type Status } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import FormCollapsible from '../form-collapsible';
import FormDatePicker from '../form-datepicker';
import ProjectFormArchitectAndSpecifier from './project-form-architect-specifier';

interface ProjectFormProps {
    id: string;
    isCreating?: boolean;
}

export interface ProjectForm {
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
    const statuses = useTanStackQuery<Status>('/lapi/statuses?type=project', ['project-statuses']);
    const marketSegments = useTanStackQuery<MarketSegment>('/lapi/market-segments', ['market-segments']);

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
            first_name: '',
            last_name: '',
            job_title: '',
        },
        specifier_address: {
            id: '',
            central_phone_number: '',
            email_address: '',
        },
    });

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

                <ProjectFormArchitectAndSpecifier form={form} />

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
