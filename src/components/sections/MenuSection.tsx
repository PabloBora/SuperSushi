"use client";

import { useState } from 'react';
import clsx from 'clsx';
import { useReveal } from '@/hooks/useReveal';
import { menuData } from '@/lib/data/menu';
import type { MenuItem as MenuItemType } from '@/types';
import styles from './MenuSection.module.css';

function MenuItem({ item, index }: { item: MenuItemType; index: number }) {
    const { ref, visible } = useReveal();
    const delayClass = styles[`revealDelay${(index % 3) + 1}`];

    return (
        <div
            ref={ref as any}
            className={clsx(styles.menuItem, styles.reveal, delayClass, visible && styles.visible)}
        >
            <div className={styles.menuItemHeader}>
                <span className={styles.menuItemName}>{item.name}</span>
                <span className={styles.menuItemPrice}>{item.price}</span>
            </div>
            <p className={styles.menuItemDesc}>{item.desc}</p>
            {item.tag && <span className={styles.menuItemTag}>{item.tag}</span>}
        </div>
    );
}

export default function MenuSection() {
    const [activeTab, setActiveTab] = useState("Omakase");

    const { ref: refLabel, visible: visibleLabel } = useReveal();
    const { ref: refTitle, visible: visibleTitle } = useReveal();
    const { ref: refDesc, visible: visibleDesc } = useReveal();
    const { ref: refTabs, visible: visibleTabs } = useReveal();

    return (
        <section className={styles.menuSection} id="menu">
            <div className={styles.menuHeader}>
                <div>
                    <div
                        ref={refLabel as any}
                        className={clsx(styles.sectionLabel, styles.reveal, visibleLabel && styles.visible)}
                    >
                        Carta de Temporada
                    </div>
                    <h2
                        ref={refTitle as any}
                        className={clsx(styles.menuTitle, styles.reveal, styles.revealDelay1, visibleTitle && styles.visible)}
                    >
                        Nuestro<br /><em>Menú</em>
                    </h2>
                </div>
                <p
                    ref={refDesc as any}
                    className={clsx(styles.menuDesc, styles.reveal, styles.revealDelay2, visibleDesc && styles.visible)}
                >
                    Diseñado por nuestro Chef para celebrar los mejores
                    productos del Pacífico. Precios incluyen impuestos.
                </p>
            </div>

            <div
                ref={refTabs as any}
                className={clsx(styles.menuTabs, styles.reveal, visibleTabs && styles.visible)}
            >
                {Object.keys(menuData).map(tab => (
                    <button
                        key={tab}
                        className={clsx(styles.menuTab, activeTab === tab && styles.active)}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className={styles.menuGrid}>
                {menuData[activeTab].map((item, i) => (
                    <MenuItem key={item.name} item={item} index={i} />
                ))}
            </div>
        </section>
    );
}
