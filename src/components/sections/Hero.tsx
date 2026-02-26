"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useMousePosition } from '@/hooks/useMousePosition';
import { scrollTo } from '@/lib/utils';
import styles from './Hero.module.css';

export default function Hero() {
    const mousePos = useMousePosition();
    const heroBgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroBgRef.current) {
            heroBgRef.current.style.transform = `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`;
        }
    }, [mousePos]); // eslint-disable-line react-hooks/exhaustive-deps

    const shimmerStyle = {
        transform: `translate(${mousePos.x * 15}%, ${mousePos.y * 15}%) rotate(${mousePos.x * 3}deg)`,
        background: `linear-gradient(${135 + mousePos.x * 20}deg, transparent 30%, rgba(200, 164, 90, 0.06) 50%, transparent 70%)`
    };

    return (
        <section className={styles.hero} id="hero">
            <div className={styles.heroBg} ref={heroBgRef} />

            {/* Abstract visual */}
            <div className={styles.heroVisual}>
                <div className={styles.heroPlate}>
                    <div className={styles.heroPlateInner}>
                        <div className={styles.mirrorShimmer} style={shimmerStyle} />
                        <svg className={styles.sushiArt} viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Decorative plate */}
                            <ellipse cx="200" cy="430" rx="160" ry="28" fill="rgba(200,164,90,0.06)" stroke="rgba(200,164,90,0.2)" strokeWidth="0.5" />
                            {/* Main piece - otoro */}
                            <rect x="90" y="280" width="100" height="58" rx="8" fill="rgba(160,90,80,0.45)" stroke="rgba(200,164,90,0.12)" strokeWidth="0.8" />
                            <rect x="94" y="290" width="92" height="14" rx="2" fill="rgba(200,120,110,0.35)" />
                            <rect x="90" y="330" width="100" height="18" rx="4" fill="rgba(240,230,200,0.12)" stroke="rgba(200,164,90,0.1)" strokeWidth="0.5" />
                            {/* Wasabi */}
                            <ellipse cx="240" cy="295" rx="22" ry="14" fill="rgba(80,130,80,0.6)" stroke="rgba(120,180,90,0.2)" strokeWidth="0.5" />
                            {/* Ginger */}
                            <path d="M260 310 Q275 295 285 310 Q278 325 265 320 Z" fill="rgba(240,180,160,0.55)" stroke="rgba(200,120,100,0.2)" strokeWidth="0.5" />
                            {/* Second piece */}
                            <rect x="210" y="340" width="90" height="52" rx="7" fill="rgba(70,100,160,0.4)" stroke="rgba(200,164,90,0.1)" strokeWidth="0.8" />
                            <rect x="214" y="352" width="82" height="12" rx="2" fill="rgba(100,140,200,0.3)" />
                            <rect x="210" y="385" width="90" height="16" rx="4" fill="rgba(240,230,200,0.1)" />
                            {/* Decorative lines */}
                            <line x1="80" y1="420" x2="320" y2="420" stroke="rgba(200,164,90,0.15)" strokeWidth="0.5" />
                            {/* Gold accent dots */}
                            <circle cx="145" cy="265" r="3" fill="rgba(200,164,90,0.6)" />
                            <circle cx="260" cy="265" r="2" fill="rgba(200,164,90,0.4)" />
                            <circle cx="310" cy="355" r="2" fill="rgba(200,164,90,0.3)" />
                            {/* Chopsticks */}
                            <line x1="330" y1="230" x2="300" y2="420" stroke="rgba(200,164,90,0.25)" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="345" y1="225" x2="315" y2="415" stroke="rgba(200,164,90,0.2)" strokeWidth="1.5" strokeLinecap="round" />
                            {/* Steam lines */}
                            <path d="M140 260 Q145 245 140 230" stroke="rgba(240,230,200,0.1)" strokeWidth="1" fill="none" />
                            <path d="M160 255 Q166 238 160 222" stroke="rgba(240,230,200,0.08)" strokeWidth="1" fill="none" />
                            {/* Top decoration */}
                            <text x="200" y="140" textAnchor="middle" fontFamily="var(--font-cormorant), serif" fontSize="80" fill="rgba(200,164,90,0.05)">鮨</text>
                            <circle cx="200" cy="120" r="80" stroke="rgba(200,164,90,0.08)" strokeWidth="0.5" fill="none" />
                            <circle cx="200" cy="120" r="60" stroke="rgba(200,164,90,0.05)" strokeWidth="0.5" fill="none" />
                        </svg>
                        <div className={styles.heroReflection} />
                    </div>
                </div>
            </div>

            <div className={styles.heroContent}>
                <div className={styles.heroEyebrow}>Experiencia Gastronómica</div>
                <h1 className={styles.heroTitle}>
                    El Arte del<br />
                    <em>Sushi</em><br />
                    Elevado
                </h1>
                <p className={styles.heroDesc}>
                    Una sinfonía de ingredientes seleccionados en Japón, técnica ancestral
                    y visión contemporánea. Cada pieza, una obra efímera.
                </p>
                <div className={styles.heroCta}>
                    <button className={styles.btnPrimary} onClick={() => scrollTo("reservacion")}>
                        Reservar Mesa
                    </button>
                    <button className={styles.btnGhost} onClick={() => scrollTo("menu")}>
                        Ver Menú
                    </button>
                </div>
            </div>

            <div className={styles.heroScrollIndicator}>
                <div className={styles.scrollLine} />
                <span className={styles.scrollLabel}>Descubrir</span>
            </div>
        </section>
    );
}
