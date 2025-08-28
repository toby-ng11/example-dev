import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    project: Project;
    [key: string]: unknown;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    p2q_system_role: string;
    default_company: string;
    default_location_id: string;
    email_verified_at?: string;
}

export interface Companies {
    company_id: string;
    company_name: string;
}

export interface Branches {
    company_id: string;
    location_id: string;
    default_branch_id: string;
    branch_description: string;
    company_name: string;
}

export interface Status {
    id: string;
    status_desc?: string;
    project_flag?: 'Y' | 'N' | null;
    quote_flag?: 'Y' | 'N' | null;
}

export interface MarketSegment {
    id: string;
    market_segment_desc?: string;
}

export interface Architect {
    id: string;
    architect_name?: string;
    architect_rep_id?: string;
    company_id?: string;
    architect_type_id?: string;
    class_id?: string;
}

export interface Specifier {
    id: string;
    first_name?: string;
    last_name?: string;
    job_title?: string;
    architect_id?: string;
}

export interface Address {
    id: string;
    name?: string;
    phys_address1?: string;
    phys_address2?: string;
    phys_city?: string;
    phys_state?: string;
    phys_postal_code?: string;
    phys_country?: string;
    central_phone_number?: string;
    email_address?: string;
    url?: string;
    addressable_id?: string;
    addressable_type?: string;
}

export interface Project {
    id: string;
    legacy_id?: string;
    project_id_ext?: string;
    project_name?: string;
    project_address?: string;
    centura_location_id?: string;
    owner_id?: string;
    shared_users?: string | null;
    reed?: string | null;
    general_contractor_id?: string | null;
    awarded_contractor_id?: string | null;
    created_at?: string | null;
    due_date?: string | null;
    required_date?: string | null;
    status: Status;
    market_segment: MarketSegment;
    architect: Architect;
    architect_address: Address;
    specifier: Specifier;
    specifier_address: Address;
}
