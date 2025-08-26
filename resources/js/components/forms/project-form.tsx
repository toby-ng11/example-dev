import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTanStackQuery } from '@/hooks/use-query';
import { SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ProjectFormProps {
    id: string;
    isCreating?: boolean;
}

interface Branches {
    location_id: string;
    branch_description: string;
}

interface Project {
    project_name: string;
    project_address: string;
    location_id: string;
    status_id: string;
    market_segment_id: string;
    due_date: string;
    require_date: string;
}

export default function ProjectForm({ id }: ProjectFormProps) {
    const { user } = usePage<SharedData>().props.auth;
    const branches = useTanStackQuery<Branches>('/lapi/branches', ['branches']);

    const form = useForm<Project>({
        project_name: '',
        project_address: '',
        location_id: '',
        status_id: '',
        market_segment_id: '',
        due_date: '',
        require_date: '',
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
                        <Input id="project_address" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location_id">Branch</Label>
                        <Select value={user.default_location_id}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a branches..." />
                            </SelectTrigger>
                            <SelectContent>
                                {branches.data?.map((branch) => (
                                    <SelectItem value={branch.location_id}>{branch.branch_description}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="status_id">Status</Label>
                        <Input id="status_id" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="market_segment_id">Market Segment</Label>
                        <Input id="market_segment_id" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="due_date">Tender Due Date</Label>
                        <Input id="due_date" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="require_date">Required Date</Label>
                        <Input id="require_date" />
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
        </form>
    );
}
