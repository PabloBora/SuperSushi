"use client";

import clsx from 'clsx';
import { useReveal } from '@/hooks/useReveal';
import styles from './Manifesto.module.css';

const ingredients = [
    { num: "01", name: "Atún de Aleta Azul", desc: "Importado directamente de los mercados Tsukiji y Toyosu. Cada pieza certificada y seleccionada manualmente.", origin: "Tokio · Japón" },
    { num: "02", name: "Arroz Koshihikari", desc: "Variedad premium de Niigata, perfeccionada por décadas de cultivo en tierras volcánicas del norte de Japón.", origin: "Niigata · Japón" },
    { num: "03", name: "Wasabi Natural", desc: "Rizoma cultivado en aguas puras de montaña. Rallado al momento, sin conservadores ni colorantes artificiales.", origin: "Shizuoka · Japón" },
    { num: "04", name: "Uni Hokkaido", desc: "Erizo de mar de las frías aguas del norte. Textura cremosa y sabor oceánico que no admite mediocre compañía.", origin: "Hokkaido · Japón" },
];

function IngredientCard({ ing, i }: { ing: typeof ingredients[0], i: number }) {
    const { ref, visible } = useReveal();
    const delayClass = styles[`revealDelay${(i % 3) + 1}`];

    return (
        <div ref={ref as any} className={clsx(styles.ingredientCard, styles.reveal, delayClass, visible && styles.visible)}>
            <span className={styles.ingredientNum}>{ing.num}</span>
            <div className={styles.ingredientInfo}>
                <h3>{ing.name}</h3>
                <p>{ing.desc}</p>
            </div>
            <span className={styles.ingredientOrigin}>{ing.origin}</span>
        </div>
    );
}

export default function Manifesto() {
    const { ref: refLabel, visible: visibleLabel } = useReveal();
    const { ref: refHeadline, visible: visibleHeadline } = useReveal();
    const { ref: refBody, visible: visibleBody } = useReveal();

    return (
        <section className={styles.manifesto} id="manifesto">
            <div className={styles.manifestoBg}>
                <div className={clsx(styles.floatElement, styles.floatCircle1, styles.animFloat1)} />
                <div className={clsx(styles.floatElement, styles.floatCircle2, styles.animFloat2)} />
                <div className={clsx(styles.floatElement, styles.floatTextJp)}>鮨</div>
            </div>

            <div className={styles.manifestoGrid}>
                <div className={styles.manifestoLeft}>
                    <div
                        ref={refLabel as any}
                        className={clsx(styles.sectionLabel, styles.reveal, visibleLabel && styles.visible)}
                    >
                        Nuestra Filosofía
                    </div>
                    <h2
                        ref={refHeadline as any}
                        className={clsx(styles.manifestoHeadline, styles.reveal, styles.revealDelay1, visibleHeadline && styles.visible)}
                    >
                        La <em>pureza</em><br />
                        es la forma<br />
                        más alta del arte
                    </h2>
                    <p
                        ref={refBody as any}
                        className={clsx(styles.manifestoBody, styles.reveal, styles.revealDelay2, visibleBody && styles.visible)}
                    >
                        En Super Sushi creemos que la excelencia no se encuentra en
                        la complejidad, sino en la claridad. Cada ingrediente habla
                        por sí mismo; nuestra labor es crear el silencio adecuado
                        para que lo escuches.
                        <br /><br />
                        Trabajamos directamente con los mercados de Tsukiji y Toyosu,
                        seleccionando cada pieza a mano. Sin intermediarios. Sin compromiso.
                    </p>
                </div>

                <div className={styles.manifestoRight}>
                    {ingredients.map((ing, i) => (
                        <IngredientCard key={ing.num} ing={ing} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
