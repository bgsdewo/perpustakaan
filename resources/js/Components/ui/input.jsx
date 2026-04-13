import { cn } from '@/lib/utils';

function Input({ className, type, size = 'h-12', ...props }) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 w-full min-w-0 rounded-lg border border-input bg-transparent p-3 text-base outline-none transition-colors file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                size,
                className,
            )}
            {...props}
        />
    );
}

export { Input };
