import { useState } from 'react';
import clsx from 'clsx';
import { useReveal } from '@/hooks/useReveal';
import styles from './Pickup.module.css';

export default function Pickup() {
    const { ref: refContainer, visible: visibleContainer } = useReveal();
    const { ref: refContent, visible: visibleContent } = useReveal();
    const { ref: refImage, visible: visibleImage } = useReveal();

    return (
        <section className={styles.pickupSection} id="pickup">
            <div className={styles.pickupGrid}>
                {/* Left Content Area */}
                <div
                    ref={refContent as any}
                    className={clsx(styles.pickupLeft, styles.reveal, visibleContent && styles.visible)}
                >
                    <div className={styles.pickupTag}>
                        Pedidos en línea • Pick-up
                    </div>

                    <div className={styles.pickupLogo}>
                        <img src="/ss logo-01.jpg.jpeg" alt="Super Sushi App" />
                    </div>

                    <h2 className={styles.pickupTitle}>
                        Ordena en línea, <em>recoge cuando quieras</em>
                    </h2>

                    <p className={styles.pickupDesc}>
                        Selecciona tus rollos favoritos, elige tu horario y paga en línea. Sin esperas, sin llamadas.
                    </p>

                    <div className={styles.pickupActions}>
                        <button className={styles.pickupBtn}>
                            Ordenar ahora
                        </button>
                    </div>

                    <div className={styles.pickupAvailability}>
                        Pick-up disponible hoy • 12:00 - 21:00
                    </div>
                </div>

                {/* Right Image/Mockup Area */}
                <div
                    ref={refImage as any}
                    className={clsx(styles.pickupRight, styles.reveal, styles.revealDelay1, visibleImage && styles.visible)}
                >
                    <div className={styles.mockupContainer}>
                        <div className={styles.mockupInner}>
                            {/* Placeholder for the restaurant photo */}
                            <div className={styles.photoPlaceholder}>
                                <span className={styles.photoIcon}>📸</span>
                                <span>Foto del restaurante</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
