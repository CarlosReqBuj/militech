"use client";

const LINEAS = [
    "> CONECTANDO CON LA RED MILITECH...",
    "> PERIMETRO DETECTADO: MURO NEGRO",
    "> VERIFICANDO CREDENCIALES... [FALLO]",
    "> OMITIENDO PROTOCOLO ICE...",
    "> BRECHA ABIERTA",
];

export default function AnimacionMuroNegro() {
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
