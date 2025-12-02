// components/ui/dialog.tsx
"use client";

import { ReactNode, useEffect } from "react";
// import { X } from "lucide-react";

export type DialogType = "success" | "warning" | "info" | "error" | "music";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    type?: DialogType;
    showCloseButton?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
}

export function Dialog({
    open,
    onClose,
    title,
    children,
    type = "info",
    showCloseButton = true,
    size = "md",
}: DialogProps) {
    // Prevent body scroll when dialog is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onClose]);

    if (!open) return null;

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
    };

    const typeColors = {
        success: "border-green-500/20",
        warning: "border-yellow-500/20",
        info: "border-blue-500/20",
        error: "border-red-500/20",
        music: "border-music-primary/20",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div
                className={`relative z-50 w-full ${sizeClasses[size]} max-h-3/5 overflow-auto bg-card rounded-xl border ${typeColors[type]} shadow-2xl`}
            >
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between p-6 pb-4 border-b border-border/50">
                        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                                aria-label="Close dialog"
                            >
                                <p className="size-5 text-muted-foreground">
                                    Close
                                </p>
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
