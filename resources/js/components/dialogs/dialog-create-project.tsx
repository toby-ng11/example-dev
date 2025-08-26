import ProjectForm from '@/components/forms/project-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDialog } from './dialog-context';

export default function CreateProjectDialog() {
    const { open, closeDialog } = useDialog('createProject');
    const formId = 'create-project-form';

    return (
        <Dialog open={open} onOpenChange={(o) => (o ? null : closeDialog())}>
            <DialogContent className="md:min-w-2xl lg:min-w-5xl">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>Enter information for the new project, then click Create.</DialogDescription>
                </DialogHeader>

                <ProjectForm id={formId} />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button form={formId} type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
