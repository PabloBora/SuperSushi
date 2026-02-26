"use client";

import { useState } from 'react';
import clsx from 'clsx';
import { useReveal } from '@/hooks/useReveal';
import { scrollTo } from '@/lib/utils';
import styles from './Reservation.module.css';

export default function Reservation() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        guests: "2"
    });

    const { ref: refLabel, visible: visibleLabel } = useReveal();
    const { ref: refTitle, visible: visibleTitle } = useReveal();
    const { ref: refBody, visible: visibleBody } = useReveal();

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    const infoItems = [
        { label: "Horario", val: "Lunes – Domingo\n12:00 – 23:00 hrs" },
        { label: "Teléfono", val: "866 170 02 89" },
        { label: "Santa Mónica", val: "Nogal #407, C.P. 25720\nMonclova, Coahuila" },
        { label: "Sucursal", val: "Paseo Monclova\nLocal F-01" },
    ];

    return (
        <section className={styles.reservation} id="reservacion">
            <div className={styles.reservationLeft}>
                <div
                    ref={refLabel as any}
                    className={clsx(styles.sectionLabel, styles.reveal, visibleLabel && styles.visible)}
                >
                    Reservaciones
                </div>
                <h2
                    ref={refTitle as any}
                    className={clsx(styles.reservationTitle, styles.reveal, styles.revealDelay1, visibleTitle && styles.visible)}
                >
                    Reserve su<br /><em>experiencia</em>
                </h2>
                <p
                    ref={refBody as any}
                    className={clsx(styles.manifestoBody, styles.reveal, styles.revealDelay2, visibleBody && styles.visible)}
                >
                    Cada servicio es íntimo y personalizado.
                    Le recomendamos reservar con al menos 48 horas de anticipación.
                </p>
                <div className={styles.reservationInfo}>
                    {infoItems.map(info => (
                        <InfoRow key={info.label} info={info} />
                    ))}
                </div>
            </div>

            <div className={styles.reservationRight}>
                {formSubmitted ? (
                    <SuccessMessage formData={formData} />
                ) : (
                    <ReservationForm
                        formData={formData}
                        onChange={handleFormChange}
                        onSubmit={handleFormSubmit}
                    />
                )}
            </div>
        </section>
    );
}

function InfoRow({ info }: { info: { label: string, val: string } }) {
    const { ref, visible } = useReveal();
    return (
        <div ref={ref as any} className={clsx(styles.infoRow, styles.reveal, visible && styles.visible)}>
            <span className={styles.infoLabel}>{info.label}</span>
            <span className={styles.infoVal} style={{ whiteSpace: "pre-line" }}>{info.val}</span>
        </div>
    );
}

function ReservationForm({
    formData,
    onChange,
    onSubmit
}: {
    formData: any,
    onChange: any,
    onSubmit: any
}) {
    const { ref: refLabel, visible: visibleLabel } = useReveal();
    const { ref: refRow1, visible: visibleRow1 } = useReveal();
    const { ref: refRow2, visible: visibleRow2 } = useReveal();
    const { ref: refSubmit, visible: visibleSubmit } = useReveal();

    return (
        <form className={styles.formStep} onSubmit={onSubmit}>
            <div ref={refLabel as any} className={clsx(styles.sectionLabel, styles.reveal, visibleLabel && styles.visible)}>
                Datos de Reservación
            </div>

            <div ref={refRow1 as any} className={clsx(styles.formRow, styles.reveal, styles.revealDelay1, visibleRow1 && styles.visible)}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nombre Completo</label>
                    <input
                        className={styles.formInput}
                        name="name"
                        placeholder="Su nombre"
                        value={formData.name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Correo Electrónico</label>
                    <input
                        className={styles.formInput}
                        name="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={formData.email}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>

            <div ref={refRow2 as any} className={clsx(styles.formRow, styles.reveal, styles.revealDelay2, visibleRow2 && styles.visible)}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Fecha</label>
                    <input
                        className={styles.formInput}
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Hora</label>
                    <select
                        className={styles.formSelect}
                        name="time"
                        value={formData.time}
                        onChange={onChange}
                        required
                    >
                        <option value="">Seleccionar</option>
                        {["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"].map(t => (
                            <option key={t} value={t}>{t} hrs</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Comensales</label>
                    <select
                        className={styles.formSelect}
                        name="guests"
                        value={formData.guests}
                        onChange={onChange}
                    >
                        {["1", "2", "3", "4", "5", "6", "7", "8"].map(n => (
                            <option key={n} value={n}>{n} {n === "1" ? "persona" : "personas"}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                ref={refSubmit as any}
                type="submit"
                className={clsx(styles.formSubmit, styles.reveal, styles.revealDelay3, visibleSubmit && styles.visible)}
            >
                Confirmar Reservación
            </button>
        </form>
    );
}

function SuccessMessage({ formData }: { formData: any }) {
    const { ref, visible } = useReveal();
    return (
        <div ref={ref as any} className={clsx(styles.formSuccess, styles.reveal, visible && styles.visible)}>
            <div className={styles.formSuccessIcon}>✓</div>
            <h3>Reservación Confirmada</h3>
            <p>
                Gracias, {formData.name}.<br />
                Le esperamos el {formData.date} a las {formData.time}.<br />
                Recibirá una confirmación en {formData.email}.
            </p>
        </div>
    );
}
