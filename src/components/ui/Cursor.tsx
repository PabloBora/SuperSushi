"use client";
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './Cursor.module.css';

export default function Cursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                className={styles.cursorOuter}
                style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
            />
            <motion.div
                className={styles.cursorInner}
                style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
            />
        </>
    );
}
