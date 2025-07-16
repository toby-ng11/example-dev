import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export function DataTableLoadingSpinner() {
    return (
        <div className="flex h-40 items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 1,
                }}
            >
                <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
            </motion.div>
        </div>
    );
}
