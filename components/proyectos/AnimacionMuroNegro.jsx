"use client";

import { useEffect, useState } from "react";

const LINEAS = [
    "> CONECTANDO CON LA RED MILITECH...",
    "> PERIMETRO DETECTADO: MURO NEGRO",
    "> VERIFICANDO CREDENCIALES... [FALLO]",
    "> OMITIENDO PROTOCOLO ICE...",
    "> BRECHA ABIERTA",
];

export default function AnimacionMuroNegro() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const temporizador = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(temporizador);
    }, []);

    if (!visible) return null;

    return (
        <div className="muro" aria-hidden="true">
            <div className="muro-panel muro-izq" />
            <div className="muro-panel muro-der" />

            <div className="muro-centro">
                <h2 className="muro-titulo" data-text="MURO NEGRO">
                    MURO NEGRO
                </h2>

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
            </div>

            <div className="muro-barra" />
            <div className="muro-scan" />
        </div>
    );
}
