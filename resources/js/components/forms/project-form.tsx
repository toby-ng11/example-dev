import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTanStackQuery } from '@/hooks/use-query';
import { type MarketSegment, SharedData, type Status } from '@/types';
import { Form, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import FormDatePicker from '../form-datepicker';

interface ProjectFormProps {
    id: string;
    isCreating?: boolean;
}

interface Branches {
    location_id: string;
    branch_description: string;
}

export default function ProjectForm({ id }: ProjectFormProps) {
    const { user } = usePage<SharedData>().props.auth;
    const branches = useTanStackQuery<Branches>('/lapi/branches', ['branches']);
    const statuses = useTanStackQuery<Status>('/lapi/statuses?type=project', ['project-statuses']);
    const marketSegments = useTanStackQuery<MarketSegment>('/lapi/market-segments', ['market-segments']);

    return (
        <Form id={id} action="/projects" method="post">
            <div className="flex max-h-[500px] flex-col gap-6 overflow-y-auto p-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="project_name">Name</Label>
                        <Input id="project_name" name="project_name" autoFocus required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="project_address">Location</Label>
                        <Input id="project_address" name="project_address" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location_id">Branch</Label>
                        <Select name="location_id" defaultValue={user.default_location_id}>
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
                        <Select name="status_id">
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
                        <Select name="market_segment_id">
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
                        <FormDatePicker id="due_date" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="require_date">Required Date</Label>
                        <FormDatePicker id="require_date" />
                    </div>
                </div>

                <div className="h-[1px] border"></div>

                <Collapsible>
                    <CollapsibleTrigger asChild>
                        <Button variant="outline">
                            Assign Architect
                            <Plus className="size-4" />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                            <Input name="architect_id" type="hidden" />

                            <div className="grid gap-2">
                                <Label htmlFor="architect_name">Architect Name</Label>
                                <Input id="architect_name" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="architect_company_id">Branch</Label>
                                <Input id="architect_company_id" name="architect_company_id" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="architect_rep_id">Architect Rep.</Label>
                                <Input id="architect_rep_id" name="architect_rep_id" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="architect_class_id">Class</Label>
                                <Input id="architect_class_id" name="architect_class_id" />
                            </div>
                        </div>

                        <div className="my-6 h-[1px] border"></div>

                        <Collapsible>
                            <CollapsibleTrigger asChild>
                                <Button variant="outline">
                                    Add Address
                                    <Plus className="size-4" />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6">
                                    <Input name="architect_address_id" type="hidden" />

                                    <div className="grid gap-2">
                                        <Label htmlFor="address_list">Architect List</Label>
                                        <Input id="address_list" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="address_name">Address Nickname</Label>
                                        <Input id="address_name" name="address_name" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="phys_address1">Address 1</Label>
                                        <Input id="phys_address1" name="phys_address1" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="phys_address2">Address 2</Label>
                                        <Input id="phys_address2" name="phys_address2" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="phys_city">City</Label>
                                        <Input id="phys_city" name="phys_city" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="phys_state">Province</Label>
                                        <Input id="phys_state" name="phys_state" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="phys_postal_code">Postal Code</Label>
                                        <Input id="phys_postal_code" name="phys_postal_code" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="phys_country">Country</Label>
                                        <Input id="phys_country" name="phys_country" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="central_phone_number">Phone</Label>
                                        <Input id="central_phone_number" name="central_phone_number" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email_address">Email</Label>
                                        <Input id="email_address" name="email_address" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="url">URL</Label>
                                        <Input id="url" name="url" />
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        <div className="my-6 h-[1px] border"></div>

                        <Collapsible>
                            <CollapsibleTrigger asChild>
                                <Button variant="outline">
                                    Add Specifier
                                    <Plus className="size-4" />
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
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
                            </CollapsibleContent>
                        </Collapsible>
                    </CollapsibleContent>
                </Collapsible>

                <div className="h-[1px] border"></div>

                <Collapsible>
                    <CollapsibleTrigger asChild>
                        <Button variant="outline">
                            Assign Contractors
                            <Plus className="size-4" />
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
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
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </Form>
    );
}
