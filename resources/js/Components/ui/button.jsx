import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: 'text-white bg-gradient-to-r from-gray-700 via-gray-800 to-gray-800',
                outline: 'border-border bg-background hover:bg-muted hover:text-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-muted hover:text-foreground',
                destructive: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
                link: 'text-orange-500 underline-offset-4 hover:underline',
                orange: 'text-white bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500',
                red: 'text-white bg-gradient-to-r from-red-500 via-red-500 to-red-500',
                blue: 'text-white bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500',
                green: 'text-white bg-gradient-to-r from-green-500 via-green-500 to-green-500',
                purple: 'text-white bg-gradient-to-r from-purple-500 via-purple-500 to-purple-500',
            },
            size: {
                default: 'h-8 gap-1.5 px-2.5',
                sm: 'h-7 px-2.5 text-sm',
                lg: 'h-9 px-3',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

// ✅ FIX DI SINI
const Button = React.forwardRef(
    ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                ref={ref} // 🔥 penting
                data-slot="button"
                data-variant={variant}
                data-size={size}
                className={cn(buttonVariants({ variant, size, className }))}
                {...props}
            />
        );
    },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
