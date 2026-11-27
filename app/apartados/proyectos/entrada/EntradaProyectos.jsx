"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AnimacionMuroNegro from "@/components/proyectos/AnimacionMuroNegro";
import { CLAVE_ANIMACION_MURO } from "@/components/proyectos/EnlaceProyectosInicio";

const RUTA_PROYECTOS = "/apartados/proyectos";
const DURACION_ANIMACION = 3500;

export default function EntradaProyectos() {
    const router = useRouter();
    const autorizado = useRef(null);
    const [mostrarAnimacion, setMostrarAnimacion] = useState(false);

    useEffect(() => {
        if (autorizado.current === null) {
            let marca = null;

            try {
                const marcaTexto = window.sessionStorage.getItem(
                    CLAVE_ANIMACION_MURO,
                );
                window.sessionStorage.removeItem(CLAVE_ANIMACION_MURO);
                marca = marcaTexto ? JSON.parse(marcaTexto) : null;
            } catch {
                window.sessionStorage.removeItem(CLAVE_ANIMACION_MURO);
            }

            autorizado.current =
                marca?.origen === "/inicio" &&
                Number.isFinite(marca.creado) &&
                Date.now() - marca.creado < 10000 &&
                Boolean(marca.token) &&
                !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }

        if (!autorizado.current) {
            router.replace(RUTA_PROYECTOS);
            return;
        }

        const frame = requestAnimationFrame(() => setMostrarAnimacion(true));
        const temporizador = setTimeout(
            () => router.replace(RUTA_PROYECTOS),
            DURACION_ANIMACION,
        );

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(temporizador);
        };
    }, [router]);

    if (!mostrarAnimacion) {
        return <main className="min-h-dvh bg-neutral-950" />;
    }

    return <AnimacionMuroNegro />;
}
