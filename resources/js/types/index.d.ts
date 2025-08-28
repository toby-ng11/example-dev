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
    status_desc: string;
    project_flag: 'Y' | 'N' | null;
    quote_flag: 'Y' | 'N' | null;
}

export interface MarketSegment {
    id: string;
    market_segment_desc: string;
}

export interface Architect {
    id: string;
    architect_name: string;
    architect_rep_id: string;
    company_id: string;
    architect_type_id: string;
    class_id: string;
    [key: string]: unknown;
}

export interface Address {
    id: string;
    name: string;
    phys_address1: string;
    phys_address2: string;
    phys_city: string;
    phys_state: string;
    phys_postal_code: string;
    phys_country: string;
    central_phone_number: string;
    email_address: string;
    url: string;
}

export interface Project {
    id: string;
    legacy_id: string;
    project_id_ext: string;
    project_name: string;
    owner_id: string;
    shared_users: string;
    reed: string;
    created_at: string;
    due_date: string;
    architect_name: string;
    market_segment_desc: string;
    status_desc: string;
    [key: string]: unknown;
}
