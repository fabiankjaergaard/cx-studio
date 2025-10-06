'use client';
import { cn } from '@/lib/utils';
import React from 'react';

type SimpleDotProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function SimpleDots({ className, ...props }: SimpleDotProps) {
    return (
        <div
            className={cn('pointer-events-none fixed inset-0', className)}
            style={{ zIndex: 1 }}
            {...props}
        >
            <style>{`
                .dot-grid {
                    background-image: radial-gradient(circle, #334155 1.5px, transparent 1.5px);
                    background-size: 60px 60px;
                    background-position: 0 0, 30px 30px;
                    opacity: 0.25;
                }
            `}</style>

            <div className="absolute inset-0 dot-grid" />
        </div>
    );
}