import { AutoCompleteInput } from '@/components/auto-complete';
import FormCollapsible from '@/components/form-collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTanStackQuery } from '@/hooks/use-query';
import { Address, Architect, Companies, Specifier } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { ProjectForm } from './project-form';

interface ProjectFormArchitectAndSpecifierProps {
    form: InertiaFormProps<ProjectForm>;
}

export default function ProjectFormArchitectAndSpecifier({ form }: ProjectFormArchitectAndSpecifierProps) {
    const companies = useTanStackQuery<Companies>('/lapi/branches?type=companies', ['companies']);

    const [selectedArchitectId, setSelectedArchitectId] = useState<string | null>(null);
    const [selectedSpecifierId, setSelectedSpecifierId] = useState<string | null>(null);

    const architectAddresses = useTanStackQuery<Address>(
        selectedArchitectId ? `/architects/${selectedArchitectId}/addresses` : '',
        ['architect-addresses', selectedArchitectId],
        !!selectedArchitectId,
    );

    const architectSpecifiers = useTanStackQuery<Specifier>(
        selectedArchitectId ? `/architects/${selectedArchitectId}/specifiers` : '',
        ['architect-specifiers', selectedArchitectId],
        !!selectedArchitectId,
    );

    const specifierAddress = useTanStackQuery<Address>(
        selectedSpecifierId ? `/specifiers/${selectedSpecifierId}/address` : '',
        ['architect-specifiers', selectedSpecifierId],
        !!selectedSpecifierId,
    );

    const fillAddressFields = useCallback(
        (a: Address) => {
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
        },
        [form],
    );

    const fillSpecifierFields = useCallback(
        (s: Specifier) => {
            form.setData('specifier', {
                id: s.id,
                first_name: s.first_name,
                last_name: s.last_name,
                job_title: s.job_title,
            });
        },
        [form],
    );

    const fillSpecifierAddressFields = useCallback(
        (sa: Address) => {
            form.setData('specifier_address', {
                id: sa.id,
                central_phone_number: sa.central_phone_number,
                email_address: sa.email_address,
            });
        },
        [form],
    );

    // Auto select the first address
    useEffect(() => {
        if (!selectedArchitectId || architectAddresses.isFetching) return;
        const architectAddress = architectAddresses.data ?? [];
        if (architectAddress.length > 0 && !form.data.architect_address.id) {
            fillAddressFields(architectAddress[0]);
        }

        const architectSpecifier = architectSpecifiers.data ?? [];
        if (architectSpecifier.length > 0 && !form.data.specifier.id) {
            setSelectedSpecifierId(architectSpecifier[0].id);
            fillSpecifierFields(architectSpecifier[0]);
        }

        const sAddress = specifierAddress.data ?? [];
        if (sAddress.length > 0 && !form.data.specifier_address.id) {
            fillSpecifierAddressFields(sAddress[0]);
        }
    }, [
        architectAddresses.data,
        architectAddresses.isFetching,
        architectSpecifiers.data,
        fillAddressFields,
        fillSpecifierAddressFields,
        fillSpecifierFields,
        form.data.architect_address.id,
        form.data.specifier.id,
        form.data.specifier_address.id,
        selectedArchitectId,
        specifierAddress.data,
    ]);

    return (
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
                                    fillAddressFields(select);
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
                    <Input
                        type="hidden"
                        name="specifier_address_id"
                        value={form.data.specifier_address.id}
                        onChange={(e) => {
                            form.setData('specifier_address.id', e.target.value);
                            const selectAdress = specifierAddress.data?.find((address) => address.id === e.target.value);
                            if (selectAdress) {
                                fillSpecifierAddressFields(selectAdress);
                            }
                        }}
                    />

                    <div className="grid gap-2">
                        <Label htmlFor="specifier_name">Specifier List</Label>
                        <Select
                            value={form.data.specifier.id}
                            onValueChange={(val) => {
                                const select = architectSpecifiers.data?.find((specifier) => specifier.id === val);
                                if (select) {
                                    setSelectedSpecifierId(select.id);
                                    fillSpecifierFields(select);
                                }
                            }}
                        >
                            <SelectTrigger className="truncate" id="specifier_name" disabled={!selectedArchitectId}>
                                <SelectValue
                                    placeholder={
                                        !selectedArchitectId
                                            ? 'Please search for an architect first...'
                                            : architectAddresses.isFetching
                                              ? 'Loading specifiers...'
                                              : (architectAddresses.data?.length ?? 0) === 0
                                                ? 'No specifier found. Fill in the fields to create a new specifier.'
                                                : 'Select a specifier'
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {architectSpecifiers.data?.map((specifier) => (
                                    <SelectItem key={specifier.id} value={specifier.id}>
                                        {specifier.first_name} {specifier.last_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="specifier_first_name">First Name</Label>
                        <Input
                            id="specifier_first_name"
                            value={form.data.specifier.first_name}
                            onChange={(e) => form.setData('specifier.first_name', e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="specifier_last_name">Last Name</Label>
                        <Input
                            id="specifier_last_name"
                            value={form.data.specifier.last_name}
                            onChange={(e) => form.setData('specifier.last_name', e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="specifier_job_title">Job Title</Label>
                        <Input
                            id="specifier_job_title"
                            value={form.data.specifier.job_title}
                            onChange={(e) => form.setData('specifier.job_title', e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="specifier_phone_number">Phone Number</Label>
                        <Input
                            id="specifier_phone_number"
                            value={form.data.specifier_address.central_phone_number}
                            onChange={(e) => form.setData('specifier_address.central_phone_number', e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="specifier_email">Email</Label>
                        <Input
                            id="specifier_email"
                            value={form.data.specifier_address.email_address}
                            onChange={(e) => form.setData('specifier_address.email_address', e.target.value)}
                        />
                    </div>
                </div>
            </FormCollapsible>
        </FormCollapsible>
    );
}
