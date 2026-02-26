"use client";

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { scrollTo } from '@/lib/utils';
import styles from './Nav.module.css';

export default function Nav() {
    const [navScrolled, setNavScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setNavScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={clsx(styles.nav, navScrolled && styles.scrolled)}>
            <div className={styles.navLogo}>Super Sushi</div>
            <ul className={styles.navLinks}>
                <li><a onClick={() => scrollTo('manifesto')}>Filosofía</a></li>
                <li><a onClick={() => scrollTo('menu')}>Menú</a></li>
                <li><a onClick={() => scrollTo('reservacion')}>Reservación</a></li>
            </ul>
            <button className={styles.navReserve} onClick={() => scrollTo('reservacion')}>
                Reservar Mesa
            </button>
        </nav>
    );
}
