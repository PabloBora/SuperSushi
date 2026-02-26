"use client";

import { useState } from 'react';
import clsx from 'clsx';
import styles from './Portal.module.css';

interface PortalProps {
    onEnter?: () => void;
}

export default function Portal({ onEnter }: PortalProps) {
    const [portalExit, setPortalExit] = useState(false);
    const [portalDone, setPortalDone] = useState(false);

    const enterPortal = () => {
        setPortalExit(true);
        setTimeout(() => {
            setPortalDone(true);
            if (onEnter) onEnter();
        }, 1300);
    };

    if (portalDone) return null;

    return (
        <div className={clsx(styles.portal, portalExit && styles.exit)}>
            <div className={styles.portalGrain} />
            <div className={styles.portalLogo}>
                <img src="/ss logo-01.jpg.jpeg" alt="Super Sushi Logo" style={{ width: 'auto', height: 'auto', maxWidth: '85vw', maxHeight: '35vh', objectFit: 'contain', zIndex: 10, position: 'relative' }} />
            </div>
            <div className={styles.portalSub}>Japanese Fusion · Monclova, Coahuila</div>
            <button className={styles.portalEnter} onClick={enterPortal}>
                Ingresar al Restaurante
            </button>
        </div>
    );
}
