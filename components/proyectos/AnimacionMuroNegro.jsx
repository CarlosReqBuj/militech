"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CLAVE_ANIMACION_MURO } from "@/components/proyectos/EnlaceProyectosInicio";

const LINEAS = [
    "> CONECTANDO CON LA RED MILITECH...",
    "> PERIMETRO DETECTADO: MURO NEGRO",
    "> VERIFICANDO CREDENCIALES... [FALLO]",
    "> OMITIENDO PROTOCOLO ICE...",
    "> BRECHA ABIERTA",
];

export default function AnimacionMuroNegro() {
    const [visible, setVisible] = useState(false);
    const tokenConsumido = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/apartados/proyectos") {
            tokenConsumido.current = null;
            const frame = requestAnimationFrame(() => setVisible(false));
            return () => cancelAnimationFrame(frame);
        }

        let token = tokenConsumido.current;

        if (!token) {
            const marca = window.sessionStorage.getItem(CLAVE_ANIMACION_MURO);
            window.sessionStorage.removeItem(CLAVE_ANIMACION_MURO);

            const instante = Number(marca?.split(":", 1)[0]);
            const marcaValida =
                Number.isFinite(instante) &&
                instante > 0 &&
                Date.now() - instante < 10000;
            const movimientoReducido = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (marcaValida && !movimientoReducido) {
                token = marca;
                tokenConsumido.current = marca;
            }
        }

        if (!token) {
            const frame = requestAnimationFrame(() => setVisible(false));
            return () => cancelAnimationFrame(frame);
        }

        setVisible(true);
        const temporizador = setTimeout(() => setVisible(false), 3500);
        return () => clearTimeout(temporizador);
    }, [pathname]);

    if (!visible || pathname !== "/apartados/proyectos") return null;

    return (
        <div className="muro" aria-hidden="true">
            <div className="muro-panel muro-izq" />
            <div className="muro-panel muro-der" />

            <div className="muro-centro">
                <p className="muro-etiqueta">MILITECH // RED DE SEGURIDAD</p>
                <h2 className="muro-titulo" data-text="MURO NEGRO">
                    MURO NEGRO
                </h2>
                <p className="muro-subtitulo">
                    Conectando con la red de proyectos
                </p>

                <div className="muro-terminal">
                    {LINEAS.map((texto, i) => (
                        <p
                            key={texto}
                            className={`muro-linea ${
                                i === LINEAS.length - 1
                                    ? "muro-linea-final"
                                    : ""
                            }`}
                            style={{
                                "--n": texto.length,
                                "--d": `${0.5 + i * 0.45}s`,
                            }}
                        >
                            {texto}
                        </p>
                    ))}
                </div>

                <div className="muro-acceso">
                    <span className="muro-acceso-punto" />
                    ACCESO CONCEDIDO
                </div>
            </div>

            <div className="muro-barra" />
            <div className="muro-scan" />
            <div className="muro-esquinas" />
        </div>
    );
}
