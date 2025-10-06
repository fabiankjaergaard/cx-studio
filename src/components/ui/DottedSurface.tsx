'use client';
import { cn } from '@/lib/utils';
import React from 'react';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
    return (
        <>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }

                .dotted-surface {
                    animation: float 15s ease-in-out infinite;
                }
            `}</style>
            <div
                className={cn('pointer-events-none fixed inset-0 dotted-surface', className)}
                style={{
                    zIndex: -1,
                    backgroundColor: 'rgba(255, 0, 0, 0.1)', // Temporary red background to see if it shows
                    backgroundImage: `
                        radial-gradient(circle at 20% 30%, rgba(148, 163, 184, 0.5) 0%, transparent 40%),
                        radial-gradient(circle at 80% 70%, rgba(71, 85, 105, 0.4) 0%, transparent 45%),
                        radial-gradient(circle at 60% 20%, rgba(148, 163, 184, 0.3) 0%, transparent 35%),
                        radial-gradient(circle at 40% 80%, rgba(71, 85, 105, 0.2) 0%, transparent 40%)
                    `,
                }}
                {...props}
            />
        </>
    );
}