"use client";

import { scrollTo } from '@/lib/utils';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLogo}>Super Sushi</div>
            <ul className={styles.footerLinks}>
                <li><a onClick={() => scrollTo('manifesto')}>Filosofía</a></li>
                <li><a onClick={() => scrollTo('menu')}>Menú</a></li>
                <li><a onClick={() => scrollTo('reservacion')}>Reservaciones</a></li>
            </ul>
            <p className={styles.footerCopy}>© 2026 Super Sushi · Todos los derechos reservados</p>
        </footer>
    );
}
