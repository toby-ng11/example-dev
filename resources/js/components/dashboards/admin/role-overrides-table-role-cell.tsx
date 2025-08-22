import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { type RoleOverride } from './role-overrides-table';

interface RoleCellProps {
    endpoint: string;
    queryKey: (string | number | boolean)[];
    user_id: string;
    override_role: string;
}

export default function RoleCell({ endpoint, queryKey, user_id, override_role }: RoleCellProps) {
    const queryClient = useQueryClient();
    const updateRole = useMutation({
        mutationFn: async (data: RoleOverride) => {
            return await axios
                .put(endpoint + '/' + data.user_id, {
                    override_role: data.override_role,
                })
                .then((response) => response.data);
        },
        onSuccess: async (data) => {
            await Promise.all([queryClient.invalidateQueries({ queryKey }), queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })]);
            toast.success(data.message);
        },
    });

    return (
        <Select
            value={override_role}
            onValueChange={(newRole) => {
                updateRole.mutate({
                    user_id: user_id,
                    override_role: newRole,
                });
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select a role..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="guest">Guest</SelectItem>
            </SelectContent>
        </Select>
    );
}
