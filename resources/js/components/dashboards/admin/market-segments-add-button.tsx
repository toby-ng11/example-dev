import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface MarketSegmentTableAddButtonProps {
    endpoint: string;
    queryKey: (string | number | boolean)[];
}

export default function MarketSegmentTableAddButton({ endpoint, queryKey }: MarketSegmentTableAddButtonProps) {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newSegmentDesc, setNewSegmentDesc] = useState('');

    return (
        <div className="absolute top-4 right-4 z-10">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button title="Add new market segment" variant="outline" className="size-8">
                        <Plus className="h-4 w-4" />
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Market Segment</DialogTitle>
                        <DialogDescription>Enter a new market segment description and click Save.</DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="desc">Market Segment</Label>
                        <Input
                            id="desc"
                            value={newSegmentDesc}
                            onChange={(e) => setNewSegmentDesc(e.target.value)}
                            placeholder="e.g. Retail, Hospitality..."
                            autoFocus
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            disabled={!newSegmentDesc.trim()}
                            onClick={async () => {
                                if (!newSegmentDesc.trim()) return;

                                try {
                                    const response = await axios.post(endpoint, {
                                        market_segment_desc: newSegmentDesc,
                                    });

                                    if (response.data) {
                                        await queryClient.invalidateQueries({ queryKey: queryKey });
                                        toast.success(`Added: ${response.data.market_segment_desc}`);
                                        setNewSegmentDesc('');
                                        setIsDialogOpen(false);
                                    }
                                } catch (err) {
                                    toast.error('Failed to add segment.');
                                    console.error(err);
                                }
                            }}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
