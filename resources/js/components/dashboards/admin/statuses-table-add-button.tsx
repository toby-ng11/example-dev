import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface StatusesTableAddButtonProps {
    endpoint: string;
    queryKey: (string | number | boolean)[];
}

type StatusForm = {
    status_desc: string;
    project_flag: string;
    quote_flag: string;
};

export default function StatusesTableAddButton({ endpoint, queryKey }: StatusesTableAddButtonProps) {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, post, processing, reset } = useForm<StatusForm>({
        status_desc: '',
        project_flag: '',
        quote_flag: '',
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        post(endpoint, {
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey });
                toast.success('Added successfully');
                setIsDialogOpen(false);
                reset();
            },
            onError: (errors) => {
                toast.error(`Error saving: ${errors}`);
            },
        });
    };

    return (
        <div className="absolute top-4 right-4 z-10">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button title="Add new status" variant="outline" className="size-8">
                        <Plus className="h-4 w-4" />
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-100">
                    <DialogHeader>
                        <DialogTitle>Add Status</DialogTitle>
                        <DialogDescription>Enter a new status description, then choose at least a flag and click Save.</DialogDescription>
                    </DialogHeader>
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-2">
                            <Label htmlFor="status_desc">Status</Label>
                            <Input
                                id="status_desc"
                                value={data.status_desc}
                                onChange={(e) => setData('status_desc', e.target.value)}
                                placeholder="e.g. Not completed, ..."
                                autoFocus
                                required
                            />
                        </div>

                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="project_flag"
                                checked={data.project_flag === 'Y'}
                                onCheckedChange={(checked) => setData('project_flag', checked ? 'Y' : 'N')}
                            />
                            <Label htmlFor="project_flag">Project Flag</Label>
                        </div>

                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="quote_flag"
                                checked={data.quote_flag === 'Y'}
                                onCheckedChange={(checked) => setData('quote_flag', checked ? 'Y' : 'N')}
                            />
                            <Label htmlFor="quote_flag">Quote Flag</Label>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsDialogOpen(false);
                                    reset();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing || !data.status_desc.trim() || (!data.project_flag && !data.quote_flag)}>
                                Save
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
