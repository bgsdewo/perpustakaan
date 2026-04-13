'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';

import { Button } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

/* ROOT */
function AlertDialog(props) {
    return <AlertDialogPrimitive.Root {...props} />;
}

function AlertDialogTrigger(props) {
    return <AlertDialogPrimitive.Trigger {...props} />;
}

function AlertDialogPortal(props) {
    return <AlertDialogPrimitive.Portal {...props} />;
}

/* OVERLAY */
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Overlay
        ref={ref}
        className={cn('fixed inset-0 z-50 bg-black/40 backdrop-blur-sm', className)}
        {...props}
    />
));
AlertDialogOverlay.displayName = 'AlertDialogOverlay';

/* CONTENT */
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
            ref={ref}
            className={cn(
                'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl',
                className,
            )}
            {...props}
        />
    </AlertDialogPortal>
));
AlertDialogContent.displayName = 'AlertDialogContent';

/* HEADER */
function AlertDialogHeader({ className, ...props }) {
    return <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />;
}

/* FOOTER */
function AlertDialogFooter({ className, ...props }) {
    return (
        <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
    );
}

/* TITLE */
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title ref={ref} className={cn('text-lg font-semibold', className)} {...props} />
));
AlertDialogTitle.displayName = 'AlertDialogTitle';

/* DESCRIPTION */
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description ref={ref} className={cn('text-sm text-gray-500', className)} {...props} />
));
AlertDialogDescription.displayName = 'AlertDialogDescription';

/* ACTION */
function AlertDialogAction({ className, ...props }) {
    return (
        <Button asChild>
            <AlertDialogPrimitive.Action className={className} {...props} />
        </Button>
    );
}

/* CANCEL */
function AlertDialogCancel({ className, ...props }) {
    return (
        <Button variant="outline" asChild>
            <AlertDialogPrimitive.Cancel className={className} {...props} />
        </Button>
    );
}

export {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
};
