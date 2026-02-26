"use client";
import { useEffect, useRef, useState } from 'react';

export function useScrollProgress() {
    const ref = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handler = () => {
            const el = ref.current;
            if (!el) return;

            const { top, height } = el.getBoundingClientRect();
            const p = Math.min(1, Math.max(0, -top / (height - window.innerHeight)));
            setProgress(p);
        };

        window.addEventListener('scroll', handler, { passive: true });
        // Trigger once on mount
        handler();

        return () => window.removeEventListener('scroll', handler);
    }, []);

    return { ref, progress };
}
