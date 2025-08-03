import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    projectName: z.string().min(2).max(255),
    projectAddress: z.string().min(2).max(255),
});

export default function DialogProject() {
    //const [projectStatus, setProjectSatus] = useState([]);

    //useEffect(() => {
    //    axios.get('/statuses').then((res) => setProjectSatus(res.data));
    //});

    const projectForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-8" size="sm">
                    <PlusCircle className="mr-1 size-4" /> Add Project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add Project</DialogTitle>
                    <DialogDescription>Add a new project.</DialogDescription>
                </DialogHeader>
                <Form {...projectForm}>
                    <form onSubmit={projectForm.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                            <FormField
                                control={projectForm.control}
                                name="projectName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Project name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={projectForm.control}
                                name="projectAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123 Test Ave" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
