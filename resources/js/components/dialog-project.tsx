import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, usePage } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type ProjectProps = {
    projectStatus: { id: number; status_desc: string }[];
    marketSegment: { id: number; market_segment_desc: string }[];
};

export default function DialogProject() {
    const { data, setData, post, reset, errors } = useForm({
        project_name: '',
        project_address: '',
        status: '',
        market_segment_id: '',
        reed: '',
        due_date: '',
        require_date: '',
    });

    const { props } = usePage<ProjectProps>();

    const projectStatus = props.projectStatus;
    const marketSegment = props.marketSegment;

    const createProject: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('projects.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Project create successfully!');
            },
            onError: (errors) => {
                if (errors.project_name) {
                    reset('project_name'); // clear field if needed
                    document.getElementById('project_name')?.focus();
                } else if (errors.project_address) {
                    reset('project_address');
                    document.getElementById('project_address')?.focus();
                } else if (errors.location_id) {
                    document.getElementById('location_id')?.focus();
                } else if (errors.status) {
                    document.getElementById('status')?.focus();
                } else if (errors.market_segment_id) {
                    document.getElementById('market_segment_id')?.focus();
                }
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-8" size="sm">
                    <PlusCircle className="mr-1 size-4" /> Add Project
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full rounded-xl border-none bg-clip-padding shadow-2xl ring-4 ring-neutral-200/80 sm:max-w-2xl dark:bg-neutral-900 dark:ring-neutral-800">
                <DialogHeader>
                    <DialogTitle className="font-bold">Add Project</DialogTitle>
                    <DialogDescription>Add a new project.</DialogDescription>
                </DialogHeader>
                <form onSubmit={createProject} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="project_name">Project name</Label>
                            <Input
                                id="project_name"
                                value={data.project_name}
                                onChange={(e) => setData('project_name', e.target.value)}
                                type="text"
                                required
                                placeholder="Project name"
                            />
                            <InputError message={errors.project_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="project_address">Project address</Label>
                            <Input
                                id="project_address"
                                value={data.project_address}
                                onChange={(e) => setData('project_address', e.target.value)}
                                type="text"
                                required
                                placeholder="Project address"
                            />
                            <InputError message={errors.project_address} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Project Stage</Label>
                            <Select value={String(data.status ?? '')} onValueChange={(v) => setData('status', v)}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="-- Select stage --" />
                                </SelectTrigger>
                                <SelectContent>
                                    {projectStatus.map((s) => (
                                        <SelectItem key={s.id} value={String(s.id)}>
                                            {s.status_desc}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="market_segment_id">Project Segment</Label>
                            <Select value={String(data.market_segment_id ?? '')} onValueChange={(v) => setData('market_segment_id', v)}>
                                <SelectTrigger id="market_segment_id">
                                    <SelectValue placeholder="-- Choose market segment --" />
                                </SelectTrigger>
                                <SelectContent>
                                    {marketSegment.map((s) => (
                                        <SelectItem key={s.id} value={String(s.id)}>
                                            {s.market_segment_desc}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.market_segment_id} />
                        </div>
                    </div>
                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
