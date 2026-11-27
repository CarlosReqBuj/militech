"use client";

import Link from "next/link";

export const CLAVE_ANIMACION_MURO = "militech:activar-muro-negro";

export default function EnlaceProyectosInicio({ children, className }) {
    function marcarEntrada(event) {
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        window.sessionStorage.setItem(
            CLAVE_ANIMACION_MURO,
            `${Date.now()}:${Math.random().toString(36).slice(2)}`,
        );
    }

    return (
        <Link
            href="/apartados/proyectos"
            onClick={marcarEntrada}
            className={className}
        >
            {children}
        </Link>
    );
}
